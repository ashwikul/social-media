import parachute from "../assets/parachute.png";
import heart from "../assets/greyHeart.svg";

const PostAlbum = () => {
  return (
    <div className="relative">
      <img src={parachute} alt="image" />
      <div className="absolute bottom-0 text-white p-2">
        <p>Parachute ❤️</p>
        <div className="flex gap-1 ">
          <img src={heart} alt="image" />
          <div>67</div>
        </div>
      </div>
    </div>
  );
};

export default PostAlbum;
