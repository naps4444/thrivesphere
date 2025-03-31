import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const dirPath = path.join(process.cwd(), "data");
  const filePath = path.join(dirPath, "subscribers.json");

  // Ensure the 'data' directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Create directory if it doesn't exist
  }

  // Ensure 'subscribers.json' exists and initialize it if needed
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]), "utf-8"); // Create an empty array
  }

  if (req.method === "POST") {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const data = fs.readFileSync(filePath, "utf-8");
      const emails = JSON.parse(data);

      // Prevent duplicate emails
      if (emails.includes(email)) {
        return res.status(400).json({ message: "Email already subscribed" });
      }

      emails.push(email);
      fs.writeFileSync(filePath, JSON.stringify(emails, null, 2), "utf-8");

      return res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  } 

  else if (req.method === "GET") {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      const emails = JSON.parse(data);
      return res.status(200).json({ emails });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  res.setHeader("Allow", ["POST", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
