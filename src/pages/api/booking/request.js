import { sendEmail } from "@/utils/sendEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { service, date, email } = req.body;
  if (!service || !date || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Send Email
  const emailResponse = await sendEmail({
    to: email,
    subject: "Booking Confirmation",
    text: `Your booking for ${service} on ${date} has been received.`,
  });

  if (!emailResponse.success) {
    return res.status(500).json(emailResponse);
  }

  return res.status(200).json({ success: true, message: "Booking confirmed!" });
}
