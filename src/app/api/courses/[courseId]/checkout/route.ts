import { NextResponse } from "next/server";

import Stripe from "stripe";

import { db } from "@/config/db";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "@/lib/get-server-session";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const authSession = await getServerSession();
    const user = authSession?.user;

    //if user is not logged in
    if (!user || !user.id || !user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get courseId from params
    const { courseId } = await params;

    // Verify course exists
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
    });

    // Get purchase
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId,
        },
      },
    });

    //if purchase already exists
    if (purchase) {
      return new NextResponse("Already purchased!", { status: 400 });
    }

    //if course does not exist
    if (!course) {
      return new NextResponse("Course Not Found!", { status: 404 });
    }

    // Create checkout
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];

    // Get stripe customer
    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    //if stripe customer does not exist
    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.email,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      mode: "payment",
      line_items,
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?cancelled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
