// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { SocialMediaContext } from "../context/SocialMediaContext";

// const PostDetail = () => {
//   const { postId } = useParams(); // Extract postId from URL
//   const { posts } = useContext(SocialMediaContext);
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     // Find the post by its ID from the posts context or state
//     const foundPost = posts.find((post) => post.id === postId);
//     setPost(foundPost);
//   }, [postId, posts]);

//   if (!post) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <p className="text-xs font-normal">{post.caption}</p>
//       {post.gallery.length > 0 && (
//         // <div className="w-full rounded-3xl overflow-hidden relative">
//         <div
//           className={`${
//             post.gallery.length === 1 ? "w-full" : "grid grid-cols-2 gap-2"
//           }`}
//         >
//           {post.gallery.map((p, i) => (
//             <div key={i} className="w-full h-full">
//               {/* Check if it's a video */}
//               {p.type === "video" ? (
//                 <video
//                   controls
//                   className="w-full h-full object-cover"
//                   src={p.url}
//                   onError={(e) => console.error("Video failed to load", e)}
//                 >
//                   Your browser does not support the video tag.
//                 </video>
//               ) : (
//                 // Fallback to image
//                 <img
//                   src={p.url}
//                   alt="post media"
//                   className="w-full h-full object-cover"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Adjust the import path to your Firebase configuration

const PostDetail = () => {
  const { postId } = useParams(); // Extract postId from URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, "posts", postId); // Use db directly
        const postSnapshot = await getDoc(postRef); // Fetch the document

        if (postSnapshot.exists()) {
          setPost({ id: postSnapshot.id, ...postSnapshot.data() }); // Set post data
        } else {
          setError("Post not found."); // Handle case when post doesn't exist
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("An error occurred while fetching the post.");
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    };

    fetchPost();
  }, [postId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>No post available.</div>;
  }

  return (
    <div>
      <p className="text-xs font-normal">{post.caption}</p>
      {post.gallery?.length > 0 && (
        <div
          className={`${
            post.gallery.length === 1 ? "w-full" : "grid grid-cols-2 gap-2"
          }`}
        >
          {post.gallery.map((p, i) => (
            <div key={i} className="w-full h-full">
              {/* Check if it's a video */}
              {p.type === "video" ? (
                <video
                  controls
                  className="w-full h-full object-cover"
                  src={p.url}
                  onError={(e) => console.error("Video failed to load", e)}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={p.url}
                  alt="post media"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
