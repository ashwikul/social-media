import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { SocialMediaContext } from "./context/SocialMediaContext";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import PostDetail from "./components/PostDetail";
import { UserData, PostType } from "./types";

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  return (
    <SocialMediaContext.Provider
      value={{
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
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Routes>
    </SocialMediaContext.Provider>
  );
}

export default App;
