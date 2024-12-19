import Header from "./Header";
import Post from "./Post";
import { SocialMediaContext } from "../context/SocialMediaContext";
import { useContext, useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserData, PostType } from "../types";

const Feed = () => {
  const { setUserData, posts, setPosts } = useContext(SocialMediaContext) || {};
  const [isLoading, setIsLoading] = useState(true); // Loading state for user and posts
  const [error, setError] = useState(""); // Error handling state

  useEffect(() => {
    const auth = getAuth();

    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is already signed in:", user);

        const db = getFirestore();

        // Fetch user data
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && setUserData) {
          // Typecast Firestore data to match UserData
          const userData = {
            userId: user.uid,
            ...docSnap.data(),
          } as UserData;
          setUserData(userData);
        } else {
          console.log("No such document!");
        }

        // Fetch posts
        const postsCollection = collection(db, "posts");
        const querySnapshot = await getDocs(postsCollection);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          postId: doc.id,
          // id: doc.id,
          ...doc.data(),
        })) as PostType[];

        // Sort posts based on timestamp (most recent first)
        const sortedPosts = fetchedPosts.sort(
          (a, b) => Number(b.timestamp) - Number(a.timestamp)
        );

        setPosts && setPosts(sortedPosts);

        setIsLoading(false);
      } else {
        console.log("No user signed in");
        setError("No user signed in. Please log in.");
        setIsLoading(false);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [setUserData, setPosts]);

  console.log("posts", posts);

  if (isLoading) {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="profile-loader"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>; // Display any error message
  }

  return (
    <div className="bg-slate-100  flex justify-center">
      <div className="w-full lg:w-1/2 bg-white p-4">
        <Header />
        <h1 className="font-extrabold text-2xl mt-6 mb-4">Feeds</h1>
        {posts && posts?.length > 0 ? (
          posts.map((post) => <Post key={post.postId} post={post} />)
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
