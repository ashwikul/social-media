import folder from "../assets/folder.svg";
import camera from "../assets/camera.svg";
import backArrowBlack from "../assets/backArrowBlack.svg";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebaseConfig"; // Firestore db
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

import { useContext } from "react";
import { SocialMediaContext } from "../context/SocialMediaContext";

import supabase from "../../supabaseClient.js";
import deleteIcon from "../assets/delete.svg";

const NewPost = ({ setAddNewPost }) => {
  // console.log("supabase", supabase);
  const { setPosts } = useContext(SocialMediaContext);

  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({ caption: "", gallery: [] });
  const user = auth.currentUser;
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate("/profile");
    setAddNewPost(false);
  };
  const handlePostSubmit = async () => {
    try {
      // Prepare post data with gallery URLs
      const postData = {
        caption: newPost.caption,
        gallery: newPost.gallery, // Use the gallery array which already has URLs
        timestamp: new Date(),
        userId: user.uid, // Add user info if necessary
      };

      // Add the post to Firestore collection
      const docRef = await addDoc(collection(db, "posts"), postData);

      console.log("Post added successfully with ID: ", docRef.id);

      // Clear the form after submission
      setNewPost({ caption: "", gallery: [] });

      // Redirect to profile page after post submission
      navigate("/profile");
      setAddNewPost(false);
    } catch (error) {
      console.error("Error adding post to Firestore: ", error.message);
    }
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    if (files.length > 0) {
      const file = files[0]; // Handle a single file
      console.log("file", file);
      const fileType = file.type.startsWith("video/") ? "video" : "image";

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
      setNewPost((prevPost) => ({
        ...prevPost,
        gallery: [
          ...prevPost.gallery,
          { url: publicUrlData.publicUrl, type: fileType },
        ],
      }));
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? newPost.gallery.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === newPost.gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDeleteImage = (index) => {
    setNewPost((prevPost) => {
      const newGallery = prevPost.gallery.filter((_, i) => i !== index);
      const newIndex =
        currentImageIndex === index ? newGallery.length - 1 : currentImageIndex;
      setCurrentImageIndex(newIndex); // Update the current image index after deletion
      return { ...prevPost, gallery: newGallery };
    });
  };

  console.log("post", newPost);

  return (
    <div className="flex justify-center items-center bg-black bg-opacity-30 fixed top-0 left-0 w-full h-full">
      <div className="p-4 flex flex-col gap-4 relative bg-white p-6 rounded-lg w-full h-full overflow-scroll lg:w-1/3 lg:h-auto ">
        <div className="flex gap-2 items-center">
          <img
            src={backArrowBlack}
            alt="folder"
            width={24}
            height={24}
            onClick={handleBack}
          />
          <p className="font-extrabold text-xl">New Post</p>
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="loader"></div>
          </div>
        )}

        {newPost.gallery.length > 0 && (
          <div>
            <div className="w-full rounded-3xl overflow-hidden relative">
              {newPost.gallery[currentImageIndex].type === "image" ? (
                <img
                  src={newPost.gallery[currentImageIndex].url}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={newPost.gallery[currentImageIndex].url}
                  controls
                  className="w-full h-full object-cover"
                ></video>
              )}
              <div className="absolute top-5 right-5 text-white">
                {currentImageIndex + 1}/{newPost.gallery.length}
              </div>
              <div
                className="absolute top-1/2 left-0 text-white p-2 cursor-pointer"
                onClick={handlePrevImage}
              >
                &lt;
              </div>
              <div
                className="absolute top-1/2 right-0 text-white p-2 cursor-pointer"
                onClick={handleNextImage}
              >
                &gt;
              </div>
              <div className="absolute bottom-5 right-5 text-white">
                <img
                  src={deleteIcon}
                  alt="delete"
                  onClick={() => handleDeleteImage(currentImageIndex)}
                />
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-2">
              {newPost.gallery.map((item, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    index === currentImageIndex
                      ? "bg-black"
                      : "bg-black opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <textarea
            className=" w-full h-52 rounded-3xl bg-[#D9D9D99C] px-3 py-6"
            placeholder="What’s on your mind?"
            value={newPost.caption}
            onChange={(e) =>
              setNewPost((prev) => ({ ...prev, caption: e.target.value }))
            }
          ></textarea>
        </div>

        <div className="hidden lg:block">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="flex gap-2 items-center cursor-pointer"
          >
            <img src={folder} alt="folder" width={16} height={16} />
            <p>Choose the file</p>
          </label>
        </div>

        <div className="sm:block md:hidden lg:hidden">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photoInput"
          />
          <label
            htmlFor="photoInput"
            className="flex gap-2 items-center cursor-pointer"
          >
            <img src={folder} alt="folder" width={16} height={16} />
            <p>Photos</p>
          </label>
        </div>

        <div className="sm:block md:hidden lg:hidden">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden sm:block md:hidden"
            id="videoInput"
          />
          <label
            htmlFor="videoInput"
            className="flex gap-2 items-center cursor-pointer"
          >
            <img src={folder} alt="folder" width={16} height={16} />
            <p>Videos</p>
          </label>
        </div>
        <input
          type="file"
          accept="image/*,video/*"
          capture="user" // Use "user" for the front-facing camera
          onChange={handleFileChange}
          className="hidden"
          id="cameraInput"
        />
        <label
          htmlFor="cameraInput"
          className="flex gap-2 items-center cursor-pointer"
        >
          <img src={camera} alt="camera" width={16} height={16} />
          <p>Camera</p>
        </label>

        {/* <div className="absolute bottom-4 left-0 w-full p-2 lg:static"> */}
        <div className="w-full p-2">
          <button
            className="w-full bg-black text-white rounded-3xl py-3"
            onClick={handlePostSubmit}
          >
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
