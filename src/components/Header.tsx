import profilepic from "../assets/profilepic.svg";
import { useNavigate } from "react-router-dom";
import { SocialMediaContext } from "../context/SocialMediaContext";
import { useContext } from "react";
import { auth, db } from "../../firebase/firebaseConfig"; // Firestore db

const Header = () => {
  const navigate = useNavigate();
  const { userData } = useContext(SocialMediaContext);
  // console.log("userData", userData.photoURL);

  const user = auth.currentUser;
  console.log("current user in header", user);

  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <div className="flex gap-2 items-center">
      <img
        src={userData?.photoURL || profilepic}
        alt="profile pic"
        height={50}
        width={50}
        onClick={handleProfile}
      />
      <div className="flex flex-col">
        <div className="font-normal text-xs text-[#00000054]">Welcome back</div>
        <div className="font-semibold text-base">{userData?.name}</div>
      </div>
    </div>
  );
};

export default Header;
