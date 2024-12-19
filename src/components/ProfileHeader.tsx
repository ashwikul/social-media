// import profilepic from "../assets/profilepic.svg";
import pencil from "../assets/HiPencil.svg";
import { useEffect, useState } from "react";
import supabase from "../../supabaseClient.js";
import placeholderPic from "../assets/placeholderPic.png";
import backArrow from "../assets/backArrowWhite.svg";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({
  isEditable,
  setIsEditable,
  setUserData,
  userData,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [heroPic, setHeroPic] = useState("");

  useEffect(() => {
    if (userData) {
      setProfilePic(userData?.photoURL || placeholderPic);
      setHeroPic(userData.heroURL);
    }
  }, [userData]);

  const handleProfilePic = async (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    if (files.length > 0) {
      const file = files[0]; // Handle a single file
      console.log("file", file);
      const fileName = `${Date.now()}-${file.name}`; // Generate a unique file name

      // Correct file path
      const filePath = `${fileName}`; // Direct path without subfolders

      console.log("filePath", filePath);
      setIsLoading(true);
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("gallery") // Name of the Supabase bucket
        .upload(filePath, file, { upsert: true });

      if (error) {
        console.error("Error uploading file:", error.message);
        return;
      }

      console.log("Upload data:", data);
      console.error("Upload error:", error);

      // Get the public URL of the uploaded file
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      console.log("Public URL:", publicUrlData.publicUrl);
      console.error("URL Error:", urlError);

      if (urlError) {
        console.error("Error getting public URL:", urlError.message);
        return;
      }

      // Add the file to the gallery with its type

      console.log("userdata before adding pic", userData);

      setUserData((prev) => ({
        ...prev,
        photoURL: publicUrlData.publicUrl,
      }));
      setIsLoading(false);
    }
  };

  const handleCoverPic = async (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    if (files.length > 0) {
      const file = files[0]; // Handle a single file
      console.log("file", file);
      const fileName = `${Date.now()}-${file.name}`; // Generate a unique file name

      // Correct file path
      const filePath = `${fileName}`; // Direct path without subfolders

      console.log("filePath", filePath);
      setIsLoading(true);
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("gallery") // Name of the Supabase bucket
        .upload(filePath, file, { upsert: true });

      if (error) {
        console.error("Error uploading file:", error.message);
        return;
      }

      console.log("Upload data:", data);
      console.error("Upload error:", error);

      // Get the public URL of the uploaded file
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      console.log("Public URL:", publicUrlData.publicUrl);
      console.error("URL Error:", urlError);

      if (urlError) {
        console.error("Error getting public URL:", urlError.message);
        return;
      }
      setIsLoading(false);
      // Add the file to the gallery with its type

      console.log("userdata before adding pic", userData);

      setUserData((prev) => ({
        ...prev,
        heroURL: publicUrlData.publicUrl,
      }));
    }
  };

  const handleImgError = () => {
    setProfilePic(placeholderPic);
  };

  const handleBack = () => {
    navigate("/feed");
  };
  return (
    <>
      <div
        className="h-1/5 md:h-2/5 lg:h-1/4 w-full bg-cover bg-center rounded-b-2xl relative flex justify-center items-center bg-slate-200"
        style={{
          backgroundImage: `url(${heroPic})`,
        }}
      >
        {isEditable ? (
          <div className="flex gap-4 items-center absolute top-5 left-4 ">
            <img
              src={backArrow}
              alt="folder"
              width={32}
              height={32}
              className="cursor-pointer"
              onClick={() => setIsEditable(false)}
            />

            <p className="text-white font-extrabold text-xl">Edit Profile</p>
          </div>
        ) : (
          <img
            src={backArrow}
            alt="folder"
            width={32}
            height={32}
            className="absolute top-5 left-4 cursor-pointer"
            onClick={handleBack}
          />
        )}

        {heroPic == undefined && (
          <p className="text-xl">Add cover picture here</p>
        )}
        {isEditable && (
          <div className="w-6 h-6 bg-slate-200 rounded-full flex justify-center items-center absolute bottom-3 right-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverPic}
              className="hidden"
              id="coverPicInput"
            />
            <label
              htmlFor="coverPicInput"
              className="flex gap-2 items-center cursor-pointer"
            >
              <img src={pencil} alt="folder" width={16} height={16} />
            </label>
          </div>
        )}
      </div>
      <div className="absolute top-20 md:top-60  lg:top-40 lg:left-4 rounded-full bg-white">
        <div className=" rounded-full overflow-hidden w-28 h-28">
          <img
            src={profilePic}
            alt="profile picture"
            className="w-full h-full object-cover"
            onError={handleImgError}
          />
        </div>

        {isEditable && (
          <div className="w-6 h-6 bg-slate-200 rounded-full flex justify-center items-center absolute bottom-3 right-0 ">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePic}
              className="hidden"
              id="profilePicInput"
            />
            <label
              htmlFor="profilePicInput"
              className="flex gap-2 items-center cursor-pointer"
            >
              <img src={pencil} alt="folder" width={16} height={16} />
            </label>
          </div>
        )}
      </div>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="profile-loader"></div>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
