import React, { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Context/AuthContext";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const responseGoogle = async (authResult) => {
    try {
      // console.log(authResult)
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        const { email, name } = result.data.user;
        // const token = result.data.token;

        const userInfo = { email, name};
        localStorage.setItem("user", JSON.stringify(userInfo));

        // ✅ update AuthContext
        setUser(userInfo);

        toast.success("Login Successful");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Login failed");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div
    className="flex items-center justify-center gap-3 border border-black rounded-xl cursor-pointer bg-gray-300 text-center p-2"
    onClick={googleLogin}
  >
    <FcGoogle size={25} /> Sign in with Google
  </div>
  
  );
};

export default GoogleLogin;
