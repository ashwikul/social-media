import UserHeader from "./UserHeader";
import lebertyStatue from "../assets/libertyStatue.png";
import heart from "../assets/HiHeart.svg";
import send from "../assets/navigation-2.svg";
const Post = () => {
  return (
    <div className="w-full h-[341px] rounded-3xl bg-[#F7EBFF] p-3 flex flex-col gap-2">
      <UserHeader />
      <p className="text-xs font-normal">
        Just arrived in New York City! Excited to explore the sights, sounds,
        and energy of this amazing place. 🗽 #NYC #Travel
      </p>
      <div>
        <img src={lebertyStatue} alt="photos"></img>
      </div>

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
