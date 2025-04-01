import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlinkBlur } from "react-loading-indicators";

export default function BlogPage() {
  const [posts, setPosts] = useState([]); // Ensure posts is always an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blogPage"); // Fetch from your API
        if (!response.ok) throw new Error("Failed to fetch blogs");

        const blogs = await response.json();
        setPosts(Array.isArray(blogs) ? blogs : []); // Ensure blogs is an array
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setPosts([]); // Ensure posts is an empty array in case of an error
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="mx-auto xl:container">
      {/* Hero Section */}
      <div className="relative flex justify-center items-center">
        <Image
          src="/bgblog.svg"
          alt="hero bg"
          width={100}
          height={100}
          className="w-full opacity-60"
        />
        <h2 className="text-center text-3xl lg:text-[60px] font-bold absolute text-black amatic-sc-bold">
          EMPOWER YOUR MIND, ELEVATE YOUR LIFE
        </h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-[150px] bg-gray-100">
        <BlinkBlur color="#154E59" size="medium" text="ThriveSphere" textColor="" />
      </div>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No blog posts available.</p>
      ) : (
        <div className="border-t-[1px] border-black mt-4 lg:mt-12 w-11/12 md:w-full mx-auto">
          <div className="w-11/12 mx-auto">
            <h1 className="font-volkhov font-extrabold mt-8 px-4">Recent Blog Posts</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 md:gap-2 w-11/12 mx-auto">
            {posts.map((post) => {
              return (

                 <Link href={`/blogPage/${post.id}`} className="">
                    
                
                <div key={post.id} className=" rounded-lg p-1">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full lg:h-[500px] object-cover rounded"
                  />
                  <h3 className="text-3xl font-bold mt-2 py-2 font-cinzel md:px-6">{post.title}</h3>
                  <p className="text-gray-600 font-volkhov md:px-6">
                    {post.description ? post.description.substring(0, 200) : ""} <span className="text-[#a98f26] hover:text-[#0b8ad8]">...Read More</span>
                  </p>

                 

                  

                 <div className="grid grid-cols-2  items-center md:px-6">
                 <p className="text-sm text-gray-500 mt-2">🗓️ {post.createdAt || "Unknown Date & Time"}</p>

                

                 
<div className="flex items-center border-black border-l-[1px] pl-3 ml-3 mt-2">
 🏷️
  {Array.isArray(post.postTags) && post.postTags.length > 0 ? (
    post.postTags.map((tag, index) => (
      <span
        key={index}
        className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded"
      >
        #{tag}
      </span>
    ))
  ) : (
    <span className="text-gray-400 text-xs">No tags available</span>
  )}
</div>

                 </div>
                  

                  
                </div>

                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
