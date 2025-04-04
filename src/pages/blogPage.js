import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlinkBlur } from 'react-loading-indicators';
import { ref, get } from 'firebase/database'; // Import necessary functions from Firebase
import { realTimeDb } from '@/lib/firebase';

export default function BlogPage() {
  const [posts, setPosts] = useState([]); // Ensure posts is always an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsRef = ref(realTimeDb, 'blogs'); // Reference to the 'blogs' node in Firebase
        const snapshot = await get(postsRef); // Fetch data from the database
        const postsData = snapshot.val();

        if (postsData) {
          const postsArray = Object.keys(postsData).map((key) => ({
            id: key,
            ...postsData[key],
          }));

          setPosts(postsArray);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setPosts([]); // Ensure posts is an empty array in case of an error
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Format the date from the Unix timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown Date & Time';
    const date = new Date(Number(timestamp)); // Convert the Unix timestamp (milliseconds)
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

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
          <BlinkBlur color="#154E59" size="medium" text="ThriveSphere" />
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No blog posts available.</p>
      ) : (
        <div className="border-t-[1px] border-black mt-4 lg:mt-12 w-11/12 md:w-full mx-auto">
          <div className="w-11/12 mx-auto">
            <h1 className="font-volkhov font-extrabold mt-8 px-4">Recent Blog Posts</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 md:gap-2 w-11/12 mx-auto">
            {posts.map((post) => (
              <Link href={`/blogPage/${post.id}`} key={post.id}>
                <div className="rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full lg:h-[300px] object-cover rounded"
                  />
                  <h3 className="text-2xl font-bold mt-4 py-2 font-cinzel">{post.title}</h3>
                  <p className="text-gray-600 font-volkhov text-sm mb-4">
                    {post.description && post.description.length > 200 ? (
                      <>
                        {post.description.substring(0, 200)}...
                        <span className="text-[#20b1ce] cursor-pointer hover:text-[#0A2A31] ml-1">
                          read more
                        </span>
                      </>
                    ) : (
                      post.description || 'No description available.'
                    )}
                  </p>

                  {/* Tags Section */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(post.tags) && post.tags.length > 0 ? (
                      post.tags.map((tag, index) => (
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

                  {/* Date */}
                  <p className="text-sm text-gray-500">
                    🗓️ {formatDate(post.createdAt)} {/* Display formatted date */}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
