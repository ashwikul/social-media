import heroPattern from "../assets/photogrid.png";
import vibesnaplogo from "../assets/vibesnaplogo.svg";
import googleIcon from "../assets/googleicon.svg";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user; // You can access user details here if needed
      console.log("User logged in:", user);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken; // Extract access token
      console.log("Access Token:", accessToken);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          userId: user.uid,
        });
      }
      // Navigate to the feed page after successful login
      navigate("/feed");
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-slate-100 h-screen flex justify-center">
      <div
        className="w-full lg:w-1/2 h-full bg-white bg-contain"
        style={{
          backgroundImage: `url(${heroPattern})`,
        }}
      >
        <div className="w-[inherit] bg-slate-50 h-1/3 absolute bottom-0 rounded-t-[3.75rem] flex flex-col  items-center ">
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
            <div className="text-base font-bold text-white cursor-pointer">
              Continue with Google
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
