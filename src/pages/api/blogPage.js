import { db } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const blogsRef = db.collection("blogs");
    const snapshot = await blogsRef.get();

    const blogs = snapshot.docs.map((doc) => {
      const data = doc.data();

      // Ensure createdAt timestamp is formatted
      const createdAt = data.createdAt?.seconds
        ? new Date(data.createdAt.seconds * 1000).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "Unknown Date & Time"; // Handle missing timestamps

      return {
        id: doc.id,
        ...data,
        createdAt, // Include formatted timestamp
      };
    });

    return res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ error: "Failed to fetch blogs" });
  }
}