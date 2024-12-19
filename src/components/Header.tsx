import placeholderPic from "../assets/placeholderPic.png";
import { useNavigate } from "react-router-dom";
import { SocialMediaContext } from "../context/SocialMediaContext";
import { useContext, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { userData } = useContext(SocialMediaContext);
  const [imgSrc, setImgSrc] = useState(userData?.photoURL || placeholderPic);

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleImgError = () => {
    setImgSrc(placeholderPic);
  };

  return (
    <div className="flex gap-2 items-center ">
      <div className="rounded-full overflow-hidden w-12 h-12 cursor-pointer">
        <img
          // src={userData?.photoURL || placeholderPic}
          src={imgSrc}
          alt="profile pic"
          className="w-full h-full object-cover "
          onClick={handleProfile}
          onError={handleImgError}
        />
      </div>

      <div className="flex flex-col">
        <div className="font-normal text-xs text-[#00000054]">Welcome back</div>
        <div className="font-semibold text-base">{userData?.name}</div>
      </div>
    </div>
  );
};

export default Header;
