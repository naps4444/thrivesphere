// /src/pages/api/checkout.js
import Stripe from "stripe";

console.log("🟢 [Server Boot] Checkout API initialized");

// 🔍 Log environment setup
console.log("🔑 Stripe Secret Key exists:", !!process.env.STRIPE_SECRET_KEY);
console.log("💵 STRIPE_PRICE_DEEP_DIVE:", process.env.STRIPE_PRICE_DEEP_DIVE);
console.log("💵 STRIPE_PRICE_MOMENTUM:", process.env.STRIPE_PRICE_MOMENTUM);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

// ✅ Map service slugs to Stripe price IDs
const SERVICE_SLUG_TO_PRICE_ID = {
  "deep-dive": process.env.STRIPE_PRICE_DEEP_DIVE,
  "momentum-package": process.env.STRIPE_PRICE_MOMENTUM,
};

export default async function handler(req, res) {
  console.log("➡️ Incoming request to /api/checkout");
  console.log("🧾 Method:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;
    console.log("📦 Full request body:", body);

    // Extract key booking fields
    const {
      selectedServiceSlug,
      fullName,
      email,
      selectedDate,
      selectedTime,
    } = body;

    console.log("🎯 Selected service slug:", selectedServiceSlug);

    const priceId = SERVICE_SLUG_TO_PRICE_ID[selectedServiceSlug];
    console.log("💰 Mapped Stripe priceId:", priceId);

    // ❌ Handle missing or misconfigured Stripe price IDs
    if (!priceId) {
      console.error("🚨 Stripe price not configured for service:", selectedServiceSlug);
      return res.status(400).json({
        error: `Stripe price not configured for this service: ${selectedServiceSlug}`,
      });
    }

    // 🧾 Create Stripe Checkout Session
    console.log("🧾 Creating Stripe checkout session...");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email || undefined, // ✅ Pre-fill email if available
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        fullName: fullName || "Unknown Client",
        email: email || "N/A",
        service: selectedServiceSlug,
        date: selectedDate || "N/A",
        time: selectedTime || "N/A",
      },
    });

    console.log("✅ Stripe checkout session created successfully!");
    console.log("🔗 Checkout session URL:", session.url);

    // Return the checkout URL to the frontend
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("🔥 Stripe checkout error:", error.message);
    console.error(error.stack);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
}
