import folder from "../assets/folder.svg";
import camera from "../assets/camera.svg";
import backArrowBlack from "../assets/backArrowBlack.svg";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <img
          src={backArrowBlack}
          alt="folder"
          width={24}
          height={24}
          onClick={handleBack}
        />
        <p className="font-extrabold text-xl">New Post</p>
      </div>
      <div className="w-full h-[341px]  ">
        <textarea
          className="w-full h-full rounded-3xl bg-[#D9D9D99C] px-3 py-6"
          placeholder="What’s on your mind?"
        ></textarea>
      </div>
      <div className="flex gap-2 items-center">
        <img src={folder} alt="folder" width={16} height={16} />
        <p>Choose the file</p>
      </div>

      <div className="flex gap-2 items-center">
        <img src={camera} alt="folder" width={16} height={16} />
        <p>Camera</p>
      </div>
      <div className="absolute bottom-4 left-0 w-full p-2">
        <button className="w-full bg-black text-white rounded-3xl py-3">
          CREATE
        </button>
      </div>
    </div>
  );
};

export default NewPost;
