import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError("All fields are required ❌");
      setSuccess("");
      return;
    }

    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      setSuccess("Signup Successful ✅");
      setError("");

      // 🔥 DIRECT LOGIN PAGE
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      const message = err.response?.data?.error;

      if (message === "User already exists") {
        setError("User already registered ❌");
      } else {
        setError("Signup failed ❌");
      }

      setSuccess("");
    }
  };

  return (
  <div className="h-screen flex flex-col items-center justify-start pt-20
                  bg-[linear-gradient(135deg,#0f172a,#020617,#000000)]">

    {/* 🔝 TITLE */}
    <h2 className="text-4xl font-bold text-white mb-10 tracking-wide">
      Signup 🚀
    </h2>

    {/* 💎 CARD WRAPPER */}
    <div className="relative group">

      {/* 🔥 GLOW (FIXED) */}
      <div
        className="absolute -inset-[2px] rounded-2xl 
                   bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 
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

        {/* ERROR / SUCCESS */}
        {error && <p className="text-red-400 mb-2 text-sm">{error}</p>}
        {success && <p className="text-green-400 mb-2 text-sm">{success}</p>}

        {/* NAME */}
        <input
          type="text"
          placeholder="Name"
          maxLength={50}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg 
                     bg-white/10 text-white 
                     placeholder-gray-400 
                     focus:outline-none 
                     focus:ring-2 focus:ring-green-500 
                     focus:ring-offset-2 focus:ring-offset-gray-900
                     transition"
        />

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
          onClick={handleSignup}
          className="w-full py-3 rounded-lg font-semibold text-white 
                     bg-gradient-to-r from-green-500 to-blue-500 
                     hover:from-blue-500 hover:to-purple-500
                     transition duration-300 
                     shadow-md shadow-green-500/20 
                     hover:shadow-blue-500/40"
        >
          Signup
        </button>

        {/* LOGIN LINK */}
        <div className="mt-5 text-center text-gray-300 text-sm">
          <p>Already have an account?</p>
          <button
            onClick={() => navigate("/")}
            className="text-blue-400 hover:text-purple-400 
                       transition hover:underline mt-1"
          >
            Go to Login
          </button>
        </div>

      </div>
    </div>
  </div>
);
}
