import { useEffect, useState, useContext } from "react";
import PostAlbum from "./PostAlbum";
import ProfileHeader from "./ProfileHeader";
import NewPost from "./NewPost";
import { SocialMediaContext } from "../context/SocialMediaContext";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { PostType } from "../types";

const Profile = () => {
  const context = useContext(SocialMediaContext);
  const { setUserData, userData, posts } = context; // Destructure with fallback

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [addNewPost, setAddNewPost] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [albums, setAlbums] = useState<PostType[]>([]);

  console.log("posts in profile", posts);
  console.log("user data in profile", userData);

  useEffect(() => {
    if (userData && posts) {
      setName(userData.name || "");
      setBio(userData.bio || "");
      const postsCopy = [...posts];
      const uid = userData.userId as string;
      const userAlbums = getAlbums(postsCopy, uid);
      setAlbums(userAlbums);
    }
  }, [userData, posts]);

  const getAlbums = (posts: PostType[], uid: string) => {
    return posts.filter((p) => p.userId === uid);
  };

  const handleName = (name: string) => {
    setUserData?.((prev) => ({
      userId: prev?.userId ?? "", // Fallback to an empty string if userId is undefined or null
      name,
      bio: prev?.bio,
      photoURL: prev?.photoURL,
      heroURL: prev?.heroURL,
    }));
  };

  const handleBio = (bio: string) => {
    setUserData?.((prev) => ({
      userId: prev?.userId ?? "", // Default to an empty string if prev or userId is null/undefined
      name: prev?.name ?? "", // Default name to an empty string if prev or name is null/undefined
      bio,
      photoURL: prev?.photoURL,
      heroURL: prev?.heroURL,
    }));
  };

  const handleSave = async () => {
    console.log("userData", userData);

    if (!userData?.userId) {
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

  if (!userData) {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="profile-loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 overflow-auto h-screen flex justify-center">
      <div className="w-full lg:w-1/2 relative">
        <ProfileHeader
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          setUserData={setUserData}
          userData={userData}
        />
        {isEditable ? (
          <div className="p-4 mt-20 flex flex-col justify-between">
            <div>
              <label>Name</label>
              <input
                type="text"
                className="bg-transparent block w-full border-b-2 border-gray-300 focus:outline-none focus:border-black-500 w-full mt-2 mb-6 font-semibold text-sm"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => handleName(e.target.value)}
              />

              <label>Bio</label>
              <textarea
                className="bg-transparent block w-full border-b-2 border-gray-300 focus:outline-none focus:border-black-500 w-full mt-2 font-semibold text-sm "
                value={bio}
                placeholder="Enter a short bio"
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
            <div className="p-4 w-full flex flex-col gap-4">
              <div className="flex justify-end ">
                <button
                  className="h-8 border border-[#00000057] rounded-3xl px-20 flex items-center font-bold text-xs"
                  onClick={() => setIsEditable(true)}
                >
                  Edit Profile
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold my-4">
                  {userData.name}
                </h3>
                <p className="font-normal text-sm mb-6">{userData.bio}</p>
              </div>

              <p className="text-lg font-semibold">My Posts</p>
              <div className="grid grid-cols-2 gap-4">
                {albums.length > 0 ? (
                  albums.map(
                    (album, index) =>
                      album.gallery.length > 0 && (
                        <PostAlbum key={index} album={album} />
                      )
                  )
                ) : (
                  <p>No posts available</p>
                )}
              </div>
            </div>
            <div className=" flex justify-end sticky bottom-6  p-4">
              <div
                className="w-12 h-12 bg-black rounded-full text-white text-4xl font-light cursor-pointer flex justify-center items-center"
                onClick={() => setAddNewPost(true)}
              >
                +
              </div>
            </div>
          </>
        )}
        {addNewPost && <NewPost setAddNewPost={setAddNewPost} />}
      </div>
    </div>
  );
};

export default Profile;
