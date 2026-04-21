import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      // localStorage.setItem("userName", res.data.user?.name || "User");
      // localStorage.setItem("userEmail", res.data.user?.email || "");

      alert("Login Successful ✅");
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data);
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">

      {/* 🔝 NAVBAR */}
      <Navbar />

      {/* 🔐 MAIN LOGIN AREA */}
      <div className="flex-1 flex items-center justify-center
                      bg-[radial-gradient(circle_at_top_left,#1e293b,#020617,#000)]
                      relative overflow-hidden">

        {/* 🌈 BACKGROUND BLOBS */}
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

        {/* 🔐 LOGIN CONTAINER */}
        <div className="relative z-10 flex flex-col items-center">

          {/* 🔝 TITLE */}
          <h2 className="text-4xl font-bold text-white mb-8 tracking-wide">
            Login 🔐
          </h2>

          {/* 💎 GLASS CARD */}
          <div className="relative group">

            {/* 🔥 GLOW BORDER */}
            <div className="absolute -inset-1 bg-gradient-to-r 
                            from-blue-500 via-purple-500 to-pink-500 
                            rounded-2xl blur opacity-30 
                            group-hover:opacity-60 transition duration-500">
            </div>

            {/* 🧊 GLASS BOX */}
            <div className="relative w-80 p-8 rounded-2xl
                            bg-white/10 backdrop-blur-2xl
                            border border-white/20
                            shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

              {/* 📧 EMAIL */}
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 p-3 rounded-xl
                           bg-white/10 text-white
                           placeholder-gray-400
                           border border-white/20
                           focus:outline-none
                           focus:ring-2 focus:ring-blue-500"
              />

              {/* 🔒 PASSWORD */}
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-5 p-3 rounded-xl
                           bg-white/10 text-white
                           placeholder-gray-400
                           border border-white/20
                           focus:outline-none
                           focus:ring-2 focus:ring-purple-500"
              />

              {/* 🚀 LOGIN BUTTON */}
              <button
                onClick={handleLogin}
                className="w-full py-3 rounded-xl font-semibold text-white
                           bg-gradient-to-r from-blue-500 to-purple-500
                           hover:from-purple-500 hover:to-pink-500
                           transition duration-300
                           shadow-lg shadow-blue-500/30
                           hover:shadow-purple-500/50"
              >
                Login
              </button>

              {/* 🔗 SIGNUP */}
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
      </div>
    </div>
  );
}