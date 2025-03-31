import { db } from "@/lib/firebaseAdmin";

export const config = {
  runtime: "nodejs", // ✅ Ensure correct execution in Next.js API
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      console.log(`🟡 Fetching blog post with ID: ${id}`); // ✅ Log request ID

      // ✅ Use Firestore Admin SDK correctly
      const docRef = db.collection("blogs").doc(id);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        console.log(`❌ Blog post with ID ${id} not found.`);
        return res.status(404).json({ message: "Blog post not found" });
      }

      console.log(`✅ Blog post found:`, docSnap.data());

      // Ensure we return createdAt as part of the response, possibly in Timestamp format.
      const data = docSnap.data();
      const createdAt = data.createdAt ? data.createdAt.toDate().toISOString() : null; // Ensure it's a valid ISO string

      return res.status(200).json({
        id: docSnap.id,
        ...data,
        createdAt, // Include createdAt in the response
      });
    } catch (error) {
      console.error("❌ Error fetching blog:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  return res.status(405).end();
}
