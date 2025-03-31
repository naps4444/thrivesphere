import { useState } from "react";
import { db, collection, addDoc, serverTimestamp } from "@/lib/firebase";

export default function CreateBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "", // Enter tags as comma-separated values
    image: null, // Store image file
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] }); // Store the image file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }

    try {
      // Convert image to base64
      const base64Image = await convertToBase64(formData.image);
      if (!base64Image) throw new Error("Image conversion failed.");

      // Convert tags into an array
      const tagsArray = formData.tags.split(",").map(tag => tag.trim());

      await addDoc(collection(db, "blogs"), {
        title: formData.title,
        description: formData.description,
        postTags: tagsArray, // Store tags as an array
        image: base64Image, // Save base64 string
        createdAt: serverTimestamp(), // Correct timestamp format
      });

      alert("Blog post created successfully!");
      setFormData({ title: "", description: "", tags: "", image: null });
    } catch (error) {
      console.error("Error adding document:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  // Function to convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // Returns base64 string
      reader.onerror = (error) => reject(error);
    });
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
