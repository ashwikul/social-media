import profilepic from "../assets/profilepic.svg";
const Header = () => {
  return (
    <div className="flex gap-2 items-center">
      <img src={profilepic} alt="profile pic" height={50} width={50} />
      <div className="flex flex-col">
        <div className="font-normal text-xs text-[#00000054]">Welcome back</div>
        <div className="font-semibold text-base">Ashwini Kulkarni</div>
      </div>
    </div>
  );
};

export default Header;
