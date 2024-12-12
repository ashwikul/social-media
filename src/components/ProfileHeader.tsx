import heroPattern from "../assets/coverpic.png";
import profilepic from "../assets/profilepic.svg";
const ProfileHeader = () => {
  return (
    <>
      <div
        className="h-1/4 w-full bg-cover bg-center rounded-b-2xl"
        style={{
          backgroundImage: `url(${heroPattern})`,
        }}
      ></div>
      <img
        src={profilepic}
        alt="profile picture"
        width={112}
        height={112}
        className="absolute top-40 left-4"
      />
    </>
  );
};

export default ProfileHeader;
