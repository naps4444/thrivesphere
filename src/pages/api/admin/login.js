import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAdminByEmail } from "@/models/Admin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.error("Invalid request method:", req.method);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    console.log("Incoming request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.error("Missing email or password:", { email, password });
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log("Fetching admin by email:", email);
    const admin = await getAdminByEmail(email);
    console.log("Admin found:", admin);

    if (!admin) {
      console.error("Admin not found for email:", email);
      return res.status(400).json({ message: "Admin not found" });
    }

    console.log("Stored password hash:", admin.password);
    console.log("Entered password:", password);

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.error("Invalid credentials for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("Missing JWT_SECRET in environment variables");
      return res.status(500).json({ message: "Internal server error" });
    }

    console.log("Generating JWT token...");
    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Login successful for admin ID:", admin.id);
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
