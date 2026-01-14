import { headers } from "next/headers";
import { NextResponse } from "next/server";

import Stripe from "stripe";

import { db } from "@/config/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  // Get request body
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature") as string;

    //if no signature
    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    //verify it is coming from stripe event
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    //if no event
    if (!event) {
      throw new Error("Invalid Stripe Event");
    }

    //Get session
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, courseId } = session.metadata ?? {
      userId: null,
      courseId: null,
    };

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Missing user email");
      }

      // if no user and course id
      if (!userId || !courseId) {
        throw new Error("Invalid request metadata");
      }

      // Create new purchase
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        },
      });
    } else {
      console.log(`Unhandled event type ${event.type}`);
      return new NextResponse(null, { status: 200 });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Webhook Error, ${error.message}`, { status: 500 });
  }
}
