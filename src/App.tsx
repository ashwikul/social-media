import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { SocialMediaContext } from "./context/SocialMediaContext";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import NewPost from "./components/NewPost";
import PostDetail from "./components/PostDetail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState("");
  const [userData, setUserData] = useState([]);
  const [posts, setPosts] = useState([]);
  return (
    <SocialMediaContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        uid,
        setUid,
        userData,
        setUserData,
        posts,
        setPosts,
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<NewPost />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Routes>
    </SocialMediaContext.Provider>
  );
}

export default App;
