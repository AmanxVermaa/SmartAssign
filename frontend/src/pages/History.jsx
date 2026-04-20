import { useEffect, useState } from "react";
import API from "../api/api";
import CustomDropdown from "../components/CustomDropdown";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function History() {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("");
  const [editId, setEditId] = useState(null);
  const [newScore, setNewScore] = useState("");
  const [newFeedback, setNewFeedback] = useState("");
  const [minScore, setMinScore] = useState("");

  const fetchData = async () => {
    try {
      const res = await API.get("/evaluations");
      setData(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load history");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔍 FILTER
  const handleFilter = async () => {
    try {
      const res = await API.get(`/evaluations/filter?minScore=${minScore}`);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Filter failed ❌");
    }
  };

  // 🔄 RESET
  const handleReset = async () => {
    try {
      setMinScore("");
      setSortType("");
      setEditId(null);
      setNewScore("");
      setNewFeedback("");

      const res = await API.get("/evaluations");
      setData(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Reset failed ❌");
    }
  };

  // 🔄 SORT
  const handleSort = (type) => {
    setSortType(type); // 👈 important

    let sortedData = [...data];

    switch (type) {
      case "high":
        sortedData.sort(
          (a, b) => (b.finalScore || b.aiScore) - (a.finalScore || a.aiScore)
        );
        break;

      case "low":
        sortedData.sort(
          (a, b) => (a.finalScore || a.aiScore) - (b.finalScore || b.aiScore)
        );
        break;

      case "latest":
        sortedData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      case "oldest":
        sortedData.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;

      default:
        return;
    }

    setData(sortedData);
  };

  // ✏️ OVERRIDE
  const handleOverride = async (id) => {
    try {
      await API.put(`/override/${id}`, {
        score: newScore,
        feedback: newFeedback,
      });

      alert("Updated ✅");
      setEditId(null);
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  // 🗑 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      await API.delete(`/evaluations/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">

      {/* 🔝 NAVBAR */}
      <Navbar />

      {/* 🔐 MAIN CONTENT */}
      <div className="flex-1 p-6
                      bg-[radial-gradient(circle_at_top_left,#1e293b,#020617,#000)]
                      relative overflow-hidden text-white">

        {/* 🌈 BLOBS */}
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

        {/* 🔝 TITLE */}
        <div className="relative z-10 text-center mb-10">
          <h1 className="text-3xl font-bold tracking-wide">
            Evaluation History 📊
          </h1>
        </div>

        {/* 🔧 CONTROLS */}
        <div className="relative z-10 flex flex-wrap justify-center gap-6 mb-10">

          {/* FILTER GROUP */}
          <div className="flex gap-2 items-center">

            <input
              type="number"
              placeholder="Min Score"
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
              className="p-3 rounded-xl 
                         bg-white/10 backdrop-blur-md 
                         border border-white/20 
                         text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleFilter}
              className="px-4 py-2 rounded-xl text-white
                         bg-gradient-to-r from-blue-500 to-purple-500
                         hover:from-purple-500 hover:to-pink-500
                         transition duration-300"
            >
              Filter 🔍
            </button>

          </div>

          {/* SORT */}
          <CustomDropdown
            options={[
              { label: "Highest Score", value: "high" },
              { label: "Lowest Score", value: "low" },
              { label: "Latest", value: "latest" },
              { label: "Oldest", value: "oldest" },
            ]}
            placeholder="Sort By"
            onSelect={handleSort}
          />

          {/* RESET */}
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl text-white
                       bg-gradient-to-r from-gray-600 to-gray-800
                       hover:scale-105 transition duration-300"
          >
            Reset 🔄
          </button>

        </div>

        {/* 📦 CARDS */}
        <div className="relative z-10 grid md:grid-cols-2 gap-6">

          {data.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >

              {/* GLOW */}
              <div className="absolute -inset-1 bg-gradient-to-r 
                              from-blue-500 via-purple-500 to-pink-500 
                              blur opacity-20 group-hover:opacity-40 transition" />

              {/* CARD */}
              <div className="relative p-6 rounded-2xl
                              bg-white/10 backdrop-blur-2xl
                              border border-white/20
                              shadow-lg">

                <p className="text-lg font-semibold">
                  Score:
                  <span className="ml-2 px-3 py-1 rounded-lg 
                                   bg-green-500/20 text-green-400">
                    {item.finalScore || item.aiScore}
                  </span>
                </p>

                <p className="mt-2"><b>Similarity:</b> {item.similarity}%</p>
                <p><b>Plagiarism:</b> {item.plagiarism}%</p>

                <p className="mt-3 text-sm text-gray-300">
                  {item.finalFeedback || item.aiFeedback}
                </p>

                {/* ACTIONS */}
                <div className="mt-5 flex gap-2">

                  <button
                    onClick={() => {
                      setEditId(item._id);
                      setNewScore(item.finalScore || item.aiScore);
                      setNewFeedback(item.finalFeedback || item.aiFeedback);
                    }}
                    className="px-3 py-1 rounded-lg text-white
                               bg-gradient-to-r from-blue-500 to-purple-500"
                  >
                    Edit ✏️
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 rounded-lg text-white
                               bg-gradient-to-r from-red-500 to-pink-500"
                  >
                    Delete 🗑️
                  </button>

                </div>

                {/* EDIT BOX */}
                {editId === item._id && (
                  <div className="mt-4">

                    <input
                      type="number"
                      value={newScore}
                      onChange={(e) => setNewScore(e.target.value)}
                      className="w-full mb-2 p-2 rounded-xl 
                                 bg-white/10 border border-white/20"
                    />

                    <input
                      type="text"
                      value={newFeedback}
                      onChange={(e) => setNewFeedback(e.target.value)}
                      className="w-full mb-2 p-2 rounded-xl 
                                 bg-white/10 border border-white/20"
                    />

                    <button
                      onClick={() => handleOverride(item._id)}
                      className="px-3 py-1 rounded-lg text-white
                                 bg-green-500"
                    >
                      Save ✅
                    </button>

                  </div>
                )}

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}