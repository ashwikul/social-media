import PostHeader from "./PostHeader";
import lebertyStatue from "../assets/libertyStatue.png";
import heart from "../assets/HiHeart.svg";
import send from "../assets/navigation-2.svg";
const Post = ({ post }) => {
  console.log("post", post);

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
          <img src={heart} height={20} width={20} />
          <div className="text-red-700">67</div>
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
