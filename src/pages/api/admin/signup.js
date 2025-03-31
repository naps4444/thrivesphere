import bcrypt from "bcryptjs";
import { getAdminByEmail, createAdmin } from "../../../models/Admin";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingAdmin = await getAdminByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await createAdmin(email, hashedPassword);

    res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
