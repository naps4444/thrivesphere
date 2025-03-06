import { db } from "@/lib/firestore";

export default async function handler(req, res) {
  try {
    const snapshot = await db.collection("your_collection").get();
    const data = snapshot.docs.map((doc) => doc.data());

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
