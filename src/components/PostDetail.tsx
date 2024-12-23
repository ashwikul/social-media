import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Adjust the import path to your Firebase configuration
import { PostType } from "../types";

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setError("Post ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        const postRef = doc(db, "posts", postId); // Use db directly
        const postSnapshot = await getDoc(postRef); // Fetch the document

        // if (postSnapshot.exists()) {
        //   setPost({ id: postSnapshot.id, ...postSnapshot.data() } as PostType); // Set post data
        // } else {
        //   setError("Post not found."); // Handle case when post doesn't exist
        // }
        if (postSnapshot.exists()) {
          const postData = postSnapshot.data();
          if (postData) {
            const fullPost: PostType = {
              // id: postSnapshot.id,
              postId: postData.postId || "", // Assuming it's required
              userId: postData.userId || "",
              caption: postData.caption || "", // Ensure fields are present or provide defaults
              gallery: postData.gallery || [],
              likes: postData.likes || 0,
              timestamp: postData.timestamp || { seconds: 0, nanoseconds: 0 }, // Fallback timestamp
            };
            setPost(fullPost); // Safely set the state with full PostType data
          }
        } else {
          setError("Post not found.");
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
