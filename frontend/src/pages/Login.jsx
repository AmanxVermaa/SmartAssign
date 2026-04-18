import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data);
      alert("Login Failed ❌");
    }
  };

return (
  <div className="h-screen flex flex-col items-center justify-start pt-20
                  bg-[linear-gradient(135deg,#0f172a,#020617,#000000)]">

    {/* 🔝 TITLE */}
    <h2 className="text-4xl font-bold text-white mb-10 tracking-wide">
      Login 🔐
    </h2>

    {/* 💎 CARD WRAPPER */}
    <div className="relative group">

      {/* 🔥 FIXED GLOW (LOW INTENSITY + NO CURSOR ISSUE) */}
      <div
        className="absolute -inset-[2px] rounded-2xl 
                   bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                   opacity-20 blur-md 
                   group-hover:opacity-40 transition duration-300
                   pointer-events-none"
      />

      {/* 🧊 GLASS CARD */}
      <div
        className="relative w-80 p-6 rounded-2xl 
                   bg-white/5 backdrop-blur-lg 
                   border border-white/10 
                   shadow-xl 
                   hover:scale-105 transition duration-300
                   cursor-default"
      >

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg 
                     bg-white/10 text-white 
                     placeholder-gray-400 
                     focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 
                     focus:ring-offset-2 focus:ring-offset-gray-900
                     transition"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg 
                     bg-white/10 text-white 
                     placeholder-gray-400 
                     focus:outline-none 
                     focus:ring-2 focus:ring-purple-500 
                     focus:ring-offset-2 focus:ring-offset-gray-900
                     transition"
        />

        {/* 🚀 BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg font-semibold text-white 
                     bg-gradient-to-r from-blue-500 to-purple-500 
                     hover:from-purple-500 hover:to-pink-500
                     transition duration-300 
                     shadow-md shadow-blue-500/20 
                     hover:shadow-purple-500/40"
        >
          Login
        </button>

        {/* SIGNUP */}
        <div className="mt-5 text-center text-gray-300 text-sm">
          <p>Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-400 hover:text-purple-400 
                       transition hover:underline mt-1"
          >
            Go to Signup
          </button>
        </div>

      </div>
    </div>
  </div>
);
}