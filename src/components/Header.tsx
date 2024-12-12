import profilepic from "../assets/profilepic.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <div className="flex gap-2 items-center">
      <img
        src={profilepic}
        alt="profile pic"
        height={50}
        width={50}
        onClick={handleProfile}
      />
      <div className="flex flex-col">
        <div className="font-normal text-xs text-[#00000054]">Welcome back</div>
        <div className="font-semibold text-base">Ashwini Kulkarni</div>
      </div>
    </div>
  );
};

export default Header;
