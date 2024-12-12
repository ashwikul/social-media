import { useState } from "react";
import PostAlbum from "./PostAlbum";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false);
  return (
    <div className="w-screen h-screen relative">
      <ProfileHeader />
      {isEditable ? (
        <div className="p-4 mt-12 flex flex-col justify-between">
          <div>
            <label>Name</label>
            <input
              type="text"
              className="block w-full border-b-2 border-gray-300 focus:outline-none focus:border-black-500 w-full mt-2 mb-6 font-semibold text-sm"
              value="Ashwini Kulkarni"
            />

            <label>Bio</label>
            <textarea
              className="block w-full border-b-2 border-gray-300 focus:outline-none focus:border-black-500 w-full mt-2 font-semibold text-sm "
              value="Just someone who loves designing, sketching, and finding beauty in the little things 💕"
            />
          </div>

          <div className="absolute bottom-4 left-0 w-full p-2">
            <button className="w-full bg-black text-white rounded-3xl py-3">
              SAVE
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4">
            <div className="flex justify-end ">
              <button
                className="h-8 border border-[#00000057] rounded-3xl px-20 flex items-center font-bold text-xs"
                onClick={() => setIsEditable(true)}
              >
                Edit Profile
              </button>
            </div>

            <h3 className="text-2xl font-extrabold my-4">Ashwini Kulkarni</h3>
            <p className="font-normal text-sm mb-6">
              Just someone who loves designing, sketching, and finding beauty in
              the little things 💕
            </p>
            <p className="text-lg font-semibold">My Posts</p>
            <div className="grid grid-cols-2 gap-4">
              <PostAlbum />
              <PostAlbum />
              <PostAlbum />
            </div>
          </div>
          <div className="w-12 h-12 bg-black rounded-full text-white flex justify-center items-center text-4xl absolute bottom-4 right-4 font-light">
            +
          </div>
          <div className="p-4">
            <div className="flex justify-end ">
              <button
                className="h-8 border border-[#00000057] rounded-3xl px-20 flex items-center font-bold text-xs"
                onClick={() => setIsEditable(true)}
              >
                Edit Profile
              </button>
            </div>

            <h3 className="text-2xl font-extrabold my-4">Ashwini Kulkarni</h3>
            <p className="font-normal text-sm mb-6">
              Just someone who loves designing, sketching, and finding beauty in
              the little things 💕
            </p>
            <p className="text-lg font-semibold">My Posts</p>
            <div className="grid grid-cols-2 gap-4">
              <PostAlbum />
              <PostAlbum />
              <PostAlbum />
            </div>
          </div>
          <div className="w-12 h-12 bg-black rounded-full text-white flex justify-center items-center text-4xl absolute bottom-4 right-4 font-light">
            +
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
