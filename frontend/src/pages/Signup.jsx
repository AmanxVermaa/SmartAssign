import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

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
    <div className="min-h-screen flex flex-col overflow-x-hidden">

      {/* 🔝 NAVBAR */}
      <Navbar />

      {/* 🔐 MAIN AREA */}
      <div className="flex-1 flex items-center justify-center
                      bg-[radial-gradient(circle_at_top_left,#1e293b,#020617,#000)]
                      relative overflow-hidden">

        {/* 🌈 BLOBS */}
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

        {/* 🧊 CONTAINER */}
        <div className="relative z-10 flex flex-col items-center">

          {/* 🔝 TITLE */}
          <h2 className="text-4xl font-bold text-white mb-8 tracking-wide">
            Signup ✨
          </h2>

          {/* 💎 GLASS CARD */}
          <div className="relative group">

            {/* 🔥 GLOW */}
            <div className="absolute -inset-1 bg-gradient-to-r 
                            from-blue-500 via-purple-500 to-pink-500 
                            rounded-2xl blur opacity-30 
                            group-hover:opacity-60 transition duration-500">
            </div>

            {/* 🧊 CARD */}
            <div className="relative w-80 p-8 rounded-2xl
                            bg-white/10 backdrop-blur-2xl
                            border border-white/20
                            shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

              {/* NAME */}
              <input
                placeholder="Name"
                maxLength={50}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-4 p-3 rounded-xl
                           bg-white/10 text-white
                           placeholder-gray-400
                           border border-white/20
                           focus:outline-none
                           focus:ring-2 focus:ring-blue-500"
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 p-3 rounded-xl
                           bg-white/10 text-white
                           placeholder-gray-400
                           border border-white/20
                           focus:outline-none
                           focus:ring-2 focus:ring-purple-500"
              />

              {/* PASSWORD */}
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-5 p-3 rounded-xl
                           bg-white/10 text-white
                           placeholder-gray-400
                           border border-white/20
                           focus:outline-none
                           focus:ring-2 focus:ring-pink-500"
              />

              {/* ERROR / SUCCESS */}
              {error && (
                <p className="text-red-400 text-sm mb-3 text-center">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-400 text-sm mb-3 text-center">
                  {success}
                </p>
              )}

              {/* 🚀 BUTTON */}
              <button
                onClick={handleSignup}
                className="w-full py-3 rounded-xl font-semibold text-white
                           bg-gradient-to-r from-blue-500 to-purple-500
                           hover:from-purple-500 hover:to-pink-500
                           transition duration-300
                           shadow-lg shadow-blue-500/30
                           hover:shadow-purple-500/50"
              >
                Signup
              </button>

              {/* 🔗 LOGIN */}
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
      </div>
    </div>
  );
}