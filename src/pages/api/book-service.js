import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { service, date, email } = req.body;
  if (!service || !date || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // Send confirmation to user
    subject: "Booking Confirmation",
    text: `Your booking for ${service} on ${date} has been received.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Booking confirmed!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, message: "Error sending email" });
  }
}
