import { ref, get } from 'firebase/database';
import { realTimeDb } from '@/lib/firebase';

export const config = {
  runtime: 'nodejs', // Ensure correct execution in Next.js API
};

export default async function handler(req, res) {
  const { id } = req.query; // Extract blog post ID from the URL

  if (req.method === 'GET') {
    try {
      console.log(`🟡 Fetching blog post with ID: ${id}`); // Log the request ID

      // Reference to the blog post in the Realtime Database
      const postRef = ref(realTimeDb, `blogs/${id}`);
      const snapshot = await get(postRef);

      // Check if the post exists
      if (snapshot.exists()) {
        const postData = snapshot.val();
        console.log(`✅ Blog post found:`, postData);

        // Include createdAt if available, otherwise set it to null
        const createdAt = postData.createdAt ? postData.createdAt : null;

        // Return the blog post data along with createdAt
        return res.status(200).json({
          id,
          ...postData,
          createdAt,
        });
      } else {
        console.log(`❌ Blog post with ID ${id} not found.`);
        return res.status(404).json({ message: `Blog post with ID ${id} not found` });
      }
    } catch (error) {
      console.error("❌ Error fetching blog post:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  return res.status(405).end(); // Method Not Allowed if not GET request
}
