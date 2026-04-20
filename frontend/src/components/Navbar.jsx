import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const userName = localStorage.getItem("userName") || "";
  const firstLetter = userName.charAt(0).toUpperCase();

  // 🔥 CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* 🧊 GLASS BACKGROUND */}
      <div
        className="absolute inset-0 
                      bg-white/5 backdrop-blur-xl 
                      border-b border-white/10"
      ></div>

      {/* 💎 NAV CONTENT */}
      <div className="relative flex items-center justify-between px-6 py-3">
        {/* 🔹 LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 object-contain 
                       hover:scale-110 transition duration-300"
          />

          <h1
            className="text-lg md:text-xl font-semibold tracking-wide
                         bg-gradient-to-r from-blue-400 to-purple-400 
                         bg-clip-text text-transparent"
          >
            SmartAssign AI
          </h1>
        </div>

        {/* 🔹 RIGHT SIDE */}
        <div className="relative" ref={dropdownRef}>
          {/* 👤 AVATAR */}
          <div
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full cursor-pointer
                       bg-gradient-to-r from-blue-500 to-purple-500
                       flex items-center justify-center text-white font-bold
                       hover:scale-105 transition"
          >
            {firstLetter}
          </div>

          {/* 🔽 DROPDOWN */}
          {open && (
            <div
              className="absolute right-0 mt-3 w-44 rounded-xl
                            bg-white/10 backdrop-blur-xl
                            border border-white/20
                            shadow-lg overflow-hidden"
            >
              <p className="px-4 py-2 text-sm text-gray-300 border-b border-white/10">
                {userName}
              </p>
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 text-sm text-white
             hover:bg-white/10 transition"
              >
                Profile 👤
              </button>

              <button
                onClick={() => navigate("/settings")}
                className="w-full text-left px-4 py-2 text-sm text-white
             hover:bg-white/10 transition"
              >
                Settings ⚙️
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full text-left px-4 py-2 text-sm text-white
                           hover:bg-white/10 transition"
              >
                Dashboard
              </button>

              <button
                onClick={() => navigate("/history")}
                className="w-full text-left px-4 py-2 text-sm text-white
                           hover:bg-white/10 transition"
              >
                History
              </button>

              <div className="h-[1px] bg-white/10 my-1"></div>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-400
                           hover:bg-red-500/20 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ✨ GLOW LINE */}
      <div
        className="h-[1px] w-full bg-gradient-to-r 
                      from-transparent via-purple-500/40 to-transparent"
      />
    </div>
  );
}
