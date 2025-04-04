import { useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Firebase (Only if not already initialized)
if (!getApps().length) {
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
}

const db = getDatabase(); // ✅ Use client SDK for Realtime DB

export default function CreateBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (!file) return;

      setFormData({ ...formData, image: file }); // Store image file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.tags) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    if (!formData.image) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      setLoading(true);
      console.log("Uploading image to Cloudinary...");

      // 1. Upload image to Cloudinary
      const formDataImg = new FormData();
      formDataImg.append("file", formData.image);
      formDataImg.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formDataImg,
        }
      );

      const cloudinaryData = await res.json();
      if (!cloudinaryData.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      const imageURL = cloudinaryData.secure_url;
      console.log("Image uploaded to Cloudinary. URL:", imageURL);

      // 2. Prepare blog data
      const blogData = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        image: imageURL,
        createdAt: serverTimestamp(),
      };

      // 3. Save to Firebase Realtime Database
      const newPostRef = await push(ref(db, "blogs"), blogData);

      if (newPostRef.key) {
        console.log("Blog post saved with ID:", newPostRef.key);
        toast.success("Post created successfully!"); // Display success toast
      } else {
        console.error("Failed to get new post ID.");
        toast.error("Something went wrong. Please try again."); // Display error toast
      }

      setFormData({ title: "", description: "", tags: "", image: null });
      setLoading(false);
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error(`Something went wrong: ${error.message}`); // Display error toast
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
