import PostHeader from "./PostHeader";
import lebertyStatue from "../assets/libertyStatue.png";
import love from "../assets/HiHeart.svg";
import heart from "../assets/greyHeart.svg";
import send from "../assets/navigation-2.svg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Firestore db
import { useState } from "react";

const Post = ({ post }) => {
  console.log("post", post);
  const [isPostLiked, setIsPostLiked] = useState(post.likes > 0);
  const [likes, setLikes] = useState(post.likes);

  // Function to update Firestore when a like or dislike occurs
  const updateLikesInFirestore = async (newLikesCount) => {
    try {
      const postRef = doc(db, "posts", post.id);
      console.log("postRef", postRef, post.id);

      await updateDoc(postRef, {
        likes: newLikesCount,
      });
    } catch (error) {
      console.error("Error updating likes in Firestore:", error);
    }
  };

  const increaseLikes = () => {
    setIsPostLiked((prev) => !prev);
    setLikes((prev) => {
      const newLikesCount = prev + 1;
      updateLikesInFirestore(newLikesCount); // Update Firestore with the new likes count
      return newLikesCount;
    });
  };

  const decreaseLikes = () => {
    setIsPostLiked((prev) => !prev);
    setLikes((prev) => {
      const newLikesCount = prev - 1;
      updateLikesInFirestore(newLikesCount); // Update Firestore with the new likes count
      return newLikesCount;
    });
  };

  return (
    <div className="w-full rounded-3xl bg-[#F7EBFF] p-3 flex flex-col gap-2 mb-3">
      <PostHeader userId={post.userId} timestamp={post.timestamp} />
      <p className="text-xs font-normal">{post.caption}</p>
      {post.gallery.length > 0 && (
        // <div className="w-full rounded-3xl overflow-hidden relative">
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
                // Fallback to image
                <img
                  src={p.url}
                  alt="post media"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = lebertyStatue)} // Fallback image
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <div>
            {isPostLiked ? (
              <img src={love} height={20} width={20} onClick={decreaseLikes} />
            ) : (
              <img src={heart} height={20} width={20} onClick={increaseLikes} />
            )}
          </div>
          <div className="text-red-700">{likes}</div>
        </div>
        <button className="flex gap-1 items-center justify-center bg-[#00000012] rounded-3xl px-2 py-1">
          <img src={send} height={20} width={20} />
          <div className="font-semibold text-sm">Share</div>
        </button>
      </div>
    </div>
  );
};

export default Post;
