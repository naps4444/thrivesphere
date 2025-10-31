// /src/pages/api/checkout-session.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { session_id } = req.query;

  if (!session_id)
    return res.status(400).json({ error: "Missing session_id" });

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items"],
    });

    res.status(200).json({
      customer_email: session.customer_details?.email,
      customer_name: session.customer_details?.name,
      amount_total: session.amount_total / 100,
      currency: session.currency,
      service: session.metadata?.service,
      date: session.metadata?.date,
      time: session.metadata?.time,
      payment_status: session.payment_status,
    });
  } catch (err) {
    console.error("Error fetching session:", err);
    res.status(500).json({ error: "Failed to fetch checkout session" });
  }
}
