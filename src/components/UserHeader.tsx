import profilepic from "../assets/profilepic.svg";

const UserHeader = () => {
  return (
    <div className="flex gap-2 items-center">
      <img src={profilepic} alt="profile pic" height={40} width={40} />
      <div className="flex flex-col">
        <div className="font-semibold text-base">Ashwini Kulkarni</div>
        <div className="font-normal text-xs text-[#00000054]">2 hours ago</div>
      </div>
    </div>
  );
};

export default UserHeader;
