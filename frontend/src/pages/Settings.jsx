import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Settings() {
  const [name, setName] = useState(localStorage.getItem("userName") || "");

  const handleSave = () => {
    localStorage.setItem("userName", name);
    alert("Updated ✅");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center
                      bg-[radial-gradient(circle_at_top_left,#1e293b,#020617,#000)] text-white">

        <div className="w-96 p-8 rounded-2xl
                        bg-white/10 backdrop-blur-2xl
                        border border-white/20">

          <h2 className="text-xl font-semibold mb-6 text-center">
            Settings ⚙️
          </h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Update Name"
            className="w-full p-3 rounded-xl mb-4
                       bg-white/10 border border-white/20
                       text-white placeholder-gray-400"
          />

          <button
            onClick={handleSave}
            className="w-full py-3 rounded-xl
                       bg-gradient-to-r from-blue-500 to-purple-500
                       hover:from-purple-500 hover:to-pink-500
                       transition"
          >
            Save Changes
          </button>

        </div>
      </div>
    </>
  );
}