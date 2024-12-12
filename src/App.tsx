import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { SocialMediaContext } from "./context/socialMediaContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <SocialMediaContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Login />
    </SocialMediaContext.Provider>
  );
}

export default App;
