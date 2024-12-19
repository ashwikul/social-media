import { useEffect, useState, useContext } from "react";
import PostAlbum from "./PostAlbum";
import ProfileHeader from "./ProfileHeader";
import NewPost from "./NewPost";
import { SocialMediaContext } from "../context/SocialMediaContext";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const { setUserData, userData } = useContext(SocialMediaContext);
  const [isEditable, setIsEditable] = useState(false);
  const [addNewPost, setAddNewPost] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setBio(userData.bio || "");
    }
  }, [userData]);

  const handleName = (name) => {
    setUserData((prev) => ({
      ...prev,
      name: name,
    }));
  };

  const handleBio = (bio) => {
    setUserData((prev) => ({
      ...prev,
      bio: bio,
    }));
  };

  const handleSave = async () => {
    console.log("userData", userData);

    if (!userData.userId) {
      console.error("User ID (uid) is undefined.");
      alert("An error occurred. Please log in again.");
      return;
    }
    setIsSaving(true);
    const db = getFirestore();
    const userRef = doc(db, "users", userData.userId);
    try {
      await updateDoc(userRef, {
        name,
        bio,
        photoURL: userData.photoURL,
        heroURL: userData.heroURL,
      });
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // if (!userData) return <div>Loading...</div>;

  {
    !userData && (
      <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="profile-loader"></div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen relative">
      <ProfileHeader
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        setUserData={setUserData}
        userData={userData}
      />
      {isEditable ? (
        <div className="p-4 mt-12 flex flex-col justify-between">
          <div>
            <label>Name</label>
            <input
              type="text"
              className="block w-full border-b-2 border-gray-300 focus:outline-none focus:border-black-500 w-full mt-2 mb-6 font-semibold text-sm"
              placeholder="Enter your name"
              value={name}
              // onChange={(e) => setName(e.target.value)}
              onChange={(e) => handleName(e.target.value)}
            />

            <label>Bio</label>
            <textarea
              className="block w-full border-b-2 border-gray-300 focus:outline-none focus:border-black-500 w-full mt-2 font-semibold text-sm "
              value={bio}
              placeholder="Enter a short bio"
              // onChange={(e) => setBio(e.target.value)}
              onChange={(e) => handleBio(e.target.value)}
            />
          </div>

          <div className="absolute bottom-4 left-0 w-full p-2">
            <button
              className={`w-full ${
                isSaving ? "bg-gray-500" : "bg-black"
              } text-white rounded-3xl py-3`}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "SAVE"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 sm:w-full md:w-1/2">
            <div className="flex justify-end ">
              <button
                className="h-8 border border-[#00000057] rounded-3xl px-20 flex items-center font-bold text-xs"
                onClick={() => setIsEditable(true)}
              >
                Edit Profile
              </button>
            </div>

            <h3 className="text-2xl font-extrabold my-4">{userData.name}</h3>
            <p className="font-normal text-sm mb-6">{userData.bio}</p>
            <p className="text-lg font-semibold">My Posts</p>
            <div className="grid grid-cols-2 gap-4">
              <PostAlbum />
              <PostAlbum />
              <PostAlbum />
            </div>
          </div>
          <div
            className="w-12 h-12 bg-black rounded-full text-white flex justify-center items-center text-4xl absolute bottom-4 right-4 font-light cursor-pointer"
            onClick={() => setAddNewPost(true)}
          >
            +
          </div>
        </>
      )}
      {addNewPost && <NewPost setAddNewPost={setAddNewPost} />}
    </div>
  );
};

export default Profile;
