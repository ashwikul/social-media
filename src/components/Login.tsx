import heroPattern from "../assets/photogrid.png";
import vibesnaplogo from "../assets/vibesnaplogo.svg";
import googleIcon from "../assets/googleicon.svg";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/feed");
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
