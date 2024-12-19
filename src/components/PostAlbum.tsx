import heart from "../assets/greyHeart.svg";

const PostAlbum = ({ album }) => {
  const firstMedia = album.gallery[0];
  const isVideo = firstMedia?.url?.endsWith(".mp4"); // or any other check based on media type

  return (
    <div className="relative rounded-lg overflow-hidden">
      {isVideo ? (
        <video
          src={firstMedia.url}
          alt="video"
          className="w-full h-full object-cover"
          controls
        />
      ) : (
        <img
          src={firstMedia?.url}
          alt="image"
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute bottom-0 text-white p-2">
        <p>{album.caption}</p>
        <div className="flex gap-1 ">
          <img src={heart} alt="heart" />
          <div>{album.likes}</div>
        </div>
      </div>
      <div className="absolute top-5 right-5 text-white">
        1/{album.gallery.length}
      </div>
    </div>
  );
};

export default PostAlbum;
