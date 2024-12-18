import profilepic from "../assets/profilepic.svg";
import { useEffect, useId, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const PostHeader = ({ userId }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Fetch user data from Firestore when `uid` is available
    const fetchUserData = async () => {
      const db = getFirestore();

      const docRef = doc(db, "users", userId); // Assume 'users' is the collection
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
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
      <img
        src={user?.photoURL || profilepic}
        alt="profile pic"
        height={40}
        width={40}
      />
      <div className="flex flex-col">
        <div className="font-semibold text-base">{user?.name}</div>
        <div className="font-normal text-xs text-[#00000054]">2 hours ago</div>
      </div>
    </div>
  );
};

export default PostHeader;
