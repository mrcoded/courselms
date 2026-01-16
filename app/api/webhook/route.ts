import { headers } from "next/headers";
import { NextResponse } from "next/server";

import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    //verify it is coming from stripe event
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Missing user email");
      }

      if (!userId || !courseId) {
        throw new Error("Invalid request metadata");
      }

      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        },
      });
    } else {
      return new NextResponse(
        `Webhook Error: Unhandled event type: ${event.type}`,
        { status: 400 }
      );
    }

    return new NextResponse(null, { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Webhook Error, ${error.message}`, { status: 500 });
  }
}
