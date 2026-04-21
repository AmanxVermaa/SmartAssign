import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);

  // 🔥 FETCH USER FROM BACKEND
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // 🔤 AVATAR LETTER
  const firstLetter = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      
      {/* 🔝 NAVBAR */}
      <Navbar />

      {/* 🔐 MAIN PROFILE AREA */}
      <div className="flex-1 flex items-center justify-center
                      bg-[radial-gradient(circle_at_top_left,#1e293b,#020617,#000)]
                      relative overflow-hidden">

        {/* 🌈 BACKGROUND BLOBS */}
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

        {/* 💎 PROFILE CARD */}
        <div className="relative z-10 w-80 p-8 rounded-2xl
                        bg-white/10 backdrop-blur-2xl
                        border border-white/20
                        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                        text-center">

          {/* 👤 AVATAR */}
          <div className="w-20 h-20 mx-auto mb-4 rounded-full
                          bg-gradient-to-r from-blue-500 to-purple-500
                          flex items-center justify-center
                          text-white text-2xl font-bold">
            {firstLetter}
          </div>

          {/* 🧑 NAME */}
          <h2 className="text-xl text-white font-semibold">
            {user?.name || "User"}
          </h2>

          {/* 📧 EMAIL */}
          <p className="text-gray-400 text-sm mt-1">
            {user?.email || "No Email"}
          </p>

          {/* 📊 EXTRA INFO (optional) */}
          <div className="mt-4 text-gray-400 text-sm">
            <p>Total Evaluations: --</p>
            <p>Joined: --</p>
          </div>

        </div>
      </div>
    </div>
  );
}