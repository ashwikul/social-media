import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { SocialMediaContext } from "./context/SocialMediaContext";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import NewPost from "./components/NewPost";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <SocialMediaContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<NewPost />} />
      </Routes>
    </SocialMediaContext.Provider>
  );
}

export default App;
