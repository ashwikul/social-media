import Header from "./Header";
import Post from "./Post";
import { SocialMediaContext } from "../context/SocialMediaContext";
import { useContext, useEffect } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const Feed = () => {
  const { uid, setUserData, posts, setPosts } = useContext(SocialMediaContext);

  useEffect(() => {
    if (uid) {
      // Fetch user data from Firestore when `uid` is available
      const fetchUserData = async () => {
        console.log("hi");

        const db = getFirestore();
        console.log("hello");

        const docRef = doc(db, "users", uid); // Assume 'users' is the collection
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };

      const fetchPosts = async () => {
        try {
          const db = getFirestore();
          const postsCollection = collection(db, "posts"); // 'posts' is assumed to be a collection
          const querySnapshot = await getDocs(postsCollection);

          const fetchedPosts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setPosts(fetchedPosts);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };

      if (uid) {
        fetchUserData();
        fetchPosts();
      }
    }
  }, [uid, setUserData, setPosts]);

  console.log("posts", posts);

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
