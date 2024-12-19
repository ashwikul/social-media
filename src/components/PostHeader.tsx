import profilepic from "../assets/profilepic.svg";
import { useEffect, useId, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import placeholderPic from "../assets/placeholderPic.png";

const PostHeader = ({ userId, timestamp }) => {
  const [user, setUser] = useState(null);
  // console.log("post header user", userId);
  const [imgSrc, setImgSrc] = useState("");

  const calculateTime = (timestamp) => {
    // Step 1: Convert the timestamp to a Date object
    const timestampDate = new Date(
      (timestamp.seconds + timestamp.nanoseconds / 1e9) * 1000
    );

    // Step 2: Calculate the difference from the current time
    const now = new Date();
    const timeDifference = now - timestampDate; // Difference in milliseconds

    // Step 3: Convert time difference into human-readable format
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Format the output
    let timeAgo = "";
    if (days > 0) {
      timeAgo = `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      timeAgo = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      timeAgo = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      timeAgo = `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
    return timeAgo;
  };

  useEffect(() => {
    // Fetch user data from Firestore when `uid` is available
    const fetchUserData = async () => {
      const db = getFirestore();

      const docRef = doc(db, "users", userId); // Assume 'users' is the collection
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
        setImgSrc(docSnap.data().photoURL);
      } else {
        console.log("No such document!");
      }
    };

    if (useId) {
      fetchUserData();
    }
  }, [useId]);
  console.log("user", user);

  return (
    <div className="flex gap-2 items-center">
      <div className="rounded-full overflow-hidden w-10 h-10">
        <img
          // src={user?.photoURL}
          src={imgSrc}
          alt="profile pic"
          className="w-full h-full object-cover"
          onError={() => {
            setImgSrc(placeholderPic);
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="font-semibold text-base">{user?.name}</div>
        <div className="font-normal text-xs text-[#00000054]">
          {calculateTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
