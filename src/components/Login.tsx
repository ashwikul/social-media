import heroPattern from "../assets/photogrid.png";
import vibesnaplogo from "../assets/vibesnaplogo.svg";
import googleIcon from "../assets/googleicon.svg";
import { useContext } from "react";
import { SocialMediaContext } from "../context/socialMediaContext";
import Feed from "./Feed";

function Login() {
  const { isLoggedIn, setIsLoggedIn } = useContext(SocialMediaContext);
  console.log("logged in", isLoggedIn);

  return (
    <div>
      {isLoggedIn ? (
        <Feed />
      ) : (
        <div
          className="bg-contain bg-center relative"
          style={{
            backgroundImage: `url(${heroPattern})`,
            height: "100vh",
            width: "100vw",
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
              onClick={() => setIsLoggedIn(true)}
            >
              <img src={googleIcon} alt="google" />
              <div className="text-base font-bold text-white">
                Continue with Google
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
