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
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const Feed = () => {
  const { uid, setUserData, posts, setPosts } = useContext(SocialMediaContext);
  const [isLoading, setIsLoading] = useState(true); // Loading state for user and posts
  const [error, setError] = useState(""); // Error handling state

  useEffect(() => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, so you can fetch user data and posts
        console.log("User is already signed in:", user);

        // Fetch user data
        const db = getFirestore();
        const docRef = doc(db, "users", user.uid); // Assuming 'users' is your collection
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }

        // Fetch posts
        const postsCollection = collection(db, "posts");
        const querySnapshot = await getDocs(postsCollection);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);

        setIsLoading(false);
      } else {
        // User is not signed in, show an error or login prompt
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
    // return <div>Loading...</div>; // Show loading state while fetching data
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
    <div className="sm:w-ful md:w-1/2 p-4">
      <Header />
      <h1 className="font-extrabold text-2xl mt-6 mb-4">Feeds</h1>
      {posts?.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Feed;
