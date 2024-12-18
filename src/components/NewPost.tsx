import folder from "../assets/folder.svg";
import camera from "../assets/camera.svg";
import backArrowBlack from "../assets/backArrowBlack.svg";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebaseConfig"; // Firestore db
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import supabase from "../../supabaseClient.js";
import deleteIcon from "../assets/delete.svg";

const NewPost = () => {
  console.log("supabase", supabase);
  const navigate = useNavigate();
  const [post, setPost] = useState({ caption: "", gallery: [] });
  const user = auth.currentUser;
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index

  const handleBack = () => {
    navigate("/profile");
  };
  const handlePostSubmit = async () => {
    if (post) {
      try {
        const fileUrls = [];
        console.log("post gallery", post.gallery);

        // Upload each file to Supabase Storage
        for (const file of post.gallery) {
          console.log("file", file);

          // const fileExt = file.name.split(".").pop(); // Get file extension (e.g., jpg, png)
          const { data, error } = await supabase.storage
            .from("gallery") // 'posts' is the Supabase bucket name
            .upload(`images/${file.name}`, file, {
              cacheControl: "3600", // Cache for 1 hour
              upsert: true, // Overwrite files if the same name is used
            });

          if (error) {
            console.error("Error uploading file to Supabase:", error.message);
            return;
          }

          // Get the public URL for the uploaded file
          const publicUrl = supabase.storage
            .from("posts")
            .getPublicUrl(data.path).publicURL;
          fileUrls.push(publicUrl); // Store the URL in the array
        }

        // Insert the post data along with the file URLs into the Supabase database
        const { error } = await supabase.from("posts").insert([
          {
            caption: post.caption,
            gallery: fileUrls, // Store URLs in gallery instead of files
            timestamp: new Date(),
          },
        ]);

        if (error) {
          console.error("Error adding post:", error.message);
          return;
        }

        // Clear form after submission
        setPost({ caption: "", gallery: [] });
        console.log("Post added successfully!");
        navigate("/profile");
      } catch (error) {
        console.error("Error adding post:", error.message);
      }
    }
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    if (files.length > 0) {
      const file = files[0]; // Handle a single file
      console.log("file", file);

      const fileName = `${Date.now()}-${file.name}`; // Generate a unique file name

      // Correct file path
      const filePath = `${fileName}`; // Direct path without subfolders

      console.log("filePath", filePath);

      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("gallery") // Name of the Supabase bucket
        .upload(filePath, file, { upsert: true }); // 'upsert' to overwrite if file already exists

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

      // Add the URL to the gallery array in state
      setPost((prevPost) => ({
        ...prevPost,
        gallery: [...prevPost.gallery, publicUrlData.publicUrl], // Store the correct public URL
      }));
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? post.gallery.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === post.gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDeleteImage = (index) => {
    setPost((prevPost) => {
      const newGallery = prevPost.gallery.filter((_, i) => i !== index);
      return { ...prevPost, gallery: newGallery };
    });
  };

  console.log("pos", post);

  return (
    <div className="flex justify-center items-center bg-black bg-opacity-30 fixed top-0 left-0 w-full h-full">
      <div className="p-4 flex flex-col gap-4 relative bg-white p-6 rounded-lg w-1/3">
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

        {post.gallery.length > 0 && (
          <div>
            <div className="w-full rounded-3xl overflow-hidden relative">
              <img
                src={post.gallery[currentImageIndex]}
                alt="post image"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-5 right-5 text-white">
                {currentImageIndex + 1}/{post.gallery.length}
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
            {/* Dots for Carousel */}
            <div className="flex justify-center gap-2 mt-2">
              {post.gallery.map((_, index) => (
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
            className=" w-full h-1/2 rounded-3xl bg-[#D9D9D99C] px-3 py-6"
            placeholder="What’s on your mind?"
            value={post.caption}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, caption: e.target.value }))
            }
          ></textarea>
        </div>

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
          <p>Choose a photo or video</p>
        </label>

        <div className="flex gap-2 items-center">
          <img src={camera} alt="camera" width={16} height={16} />
          <p>Camera</p>
        </div>
        {/* <div className="absolute bottom-4 left-0 w-full p-2"> */}
        <button
          className="w-full bg-black text-white rounded-3xl py-3"
          onClick={handlePostSubmit}
        >
          CREATE
        </button>
      </div>
    </div>
  );
};

export default NewPost;
