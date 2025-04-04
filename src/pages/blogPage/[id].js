import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BlinkBlur } from "react-loading-indicators";

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchPost() {
        try {
          console.log(`🟡 Fetching blog post: ${id}`);
          const response = await fetch(`/api/blogPage/${id}`);
          if (!response.ok) throw new Error(`Error ${response.status}: Blog post not found`);

          const data = await response.json();
          console.log("✅ Blog post data received:", data); // Debugging log

          setPost(data);
        } catch (err) {
          console.error("❌ Fetch error:", err.message);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      fetchPost();
    }
  }, [id]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown Date & Time";

    const date = new Date(Number(timestamp)); // Convert the Unix timestamp (milliseconds)
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-[150px] bg-gray-100">
        <BlinkBlur color="#154E59" size="medium" text="ThriveSphere" textColor="" />
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>Blog post not found.</p>;

  return (
    <div className="lg:w-11/12 xl:container mx-auto p-6">
      <div>
        <h2 className="text-3xl xl:text-[40px] 2xl:text-[50px] 2xl:leading-[50px] xl:w-10/12 mx-auto font-bold mt-4 text-center font-cinzel">
          {post.title}
        </h2>

        {/* 🗓️ Fixed Date Display */}
        <p className="text-gray-600 mt-2 text-center">🗓️ {formatDate(post.createdAt)}</p>
      </div>

      <div className="grid lg:grid-cols-2 lg:gap-3 mt-6">
        <div>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto md:max-h-[600px] lg:max-h-[800px] object-cover rounded lg:mt-6"
          />
        </div>

        <div>
          {/* Description */}
          <p className="mt-4 font-volkhov text-lg">{post.description}</p>

          {/* 🏷️ Tags */}
          <div className="mt-4">
            <span className="text-gray-500">Tags: </span>
            {Array.isArray(post.tags) && post.tags.length > 0 ? (
              post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded mr-2">
                  #{tag}
                </span>
              ))
            ) : (
              <span className="text-gray-400">No tags available</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
