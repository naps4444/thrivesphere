import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Saves a blog post to Firestore.
 * @param {string} title - Blog title.
 * @param {string} description - Blog description.
 * @param {string[]} tags - Blog tags.
 * @param {string} imageUrl - Image URL from Firebase Storage.
 */
export async function createBlogPost(title, description, tags, imageUrl) {
  try {
    await addDoc(collection(db, "blogs"), {
      title,
      description,
      postTags: tags.map((tag) => tag.trim()),
      image: imageUrl,
      createdAt: serverTimestamp(),
    });

    return { success: true, message: "Blog post created successfully" };
  } catch (error) {
    console.error("Error saving blog:", error);
    throw new Error("Failed to save blog post");
  }
}
