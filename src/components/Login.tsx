import heroPattern from "../assets/photogrid.png";
import vibesnaplogo from "../assets/vibesnaplogo.svg";
import googleIcon from "../assets/googleicon.svg";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; // Firestore functions
import { SocialMediaContext } from "../context/SocialMediaContext";
import { useContext } from "react";
function Login() {
  const navigate = useNavigate();
  const { setUid } = useContext(SocialMediaContext);
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // You can access user details here if needed
      console.log("User logged in:", user);

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
      });
      // Navigate to the feed page after successful login
      setUid(user.uid);
      navigate("/feed");
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="h-screen w-screen bg-contain bg-center"
      style={{
        backgroundImage: `url(${heroPattern})`,
      }}
    >
      <div className="w-full bg-slate-50 h-1/3 absolute bottom-0 rounded-t-[3.75rem] flex flex-col  items-center ">
        <div className="flex flex-col  items-center p-10">
          <div className="flex gap-2 items-center">
            <img src={vibesnaplogo} alt="logo" />
            <div className="font-semibold text-lg">Vibesnap</div>
          </div>
          <div>Moments That Matter, Shared Forever.</div>
        </div>
        <div
          className="h-12 w-56 bg-[#292929] rounded-3xl flex gap-2 justify-center items-center"
          onClick={handleLogin}
        >
          <img src={googleIcon} alt="google" />
          <div className="text-base font-bold text-white">
            Continue with Google
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
