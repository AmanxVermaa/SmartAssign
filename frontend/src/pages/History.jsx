import { useEffect, useState } from "react";
import API from "../api/api";
import CustomDropdown from "../components/CustomDropdown";
import { motion } from "framer-motion";

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

  // RESET BUTTON
  const handleReset = async () => {
  try {
    // 🔥 CLEAR ALL STATES
    setMinScore("");
    setSortType("");
    setEditId(null);
    setNewScore("");
    setNewFeedback("");

    // 🔥 FETCH ORIGINAL DATA (NO FILTER)
    const res = await API.get("/evaluations");
    setData(res.data.data);

  } catch (err) {
    console.log(err);
    alert("Reset failed ❌");
  }
};

  // 🔄 SORT
  const handleSort = (type) => {
    let sortedData = [...data];

    switch (type) {
      case "high":
        sortedData.sort(
          (a, b) =>
            (b.finalScore || b.aiScore) -
            (a.finalScore || a.aiScore)
        );
        break;

      case "low":
        sortedData.sort(
          (a, b) =>
            (a.finalScore || a.aiScore) -
            (b.finalScore || b.aiScore)
        );
        break;

      case "latest":
        sortedData.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
        break;

      case "oldest":
        sortedData.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
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
  <div className="min-h-screen p-6 
                  bg-[linear-gradient(135deg,#0f172a,#020617,#000000)] text-white">

    {/* 🔝 HEADER CENTER */}
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold tracking-wide">
        Evaluation History 📊
      </h1>
    </div>

    {/* 🎛 CONTROLS CENTER */}
    <div className="flex flex-col items-center gap-5 mb-10">

      {/* 🔍 FILTER GROUP */}
      <div className="flex gap-3">
        <input
          type="number"
          placeholder="Min Score"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
          className="px-4 py-2 rounded-lg 
                     bg-white/10 border border-white/10 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleFilter}
          className="px-5 py-2 rounded-lg 
                     bg-blue-500 hover:bg-blue-600 
                     transition"
        >
          Filter 🔍
        </button>
      </div>

      {/* 🔄 SORT + RESET GROUP */}
      <div className="flex gap-4">

        <CustomDropdown
          options={[
            { label: "Highest Score", value: "high" },
            { label: "Lowest Score", value: "low" },
            { label: "Latest", value: "latest" },
            { label: "Oldest", value: "oldest" },
          ]}
          placeholder="Sort By"
          onSelect={(value) => handleSort(value)}
        />

        <button
          onClick={handleReset}
          className="px-5 py-2 rounded-lg 
                     bg-gray-500 hover:bg-gray-600 
                     transition"
        >
          Reset 🔄
        </button>

      </div>
    </div>

    {/* 📦 CARDS */}
    <div className="grid md:grid-cols-2 gap-6">

      {data.map((item) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white/5 backdrop-blur-xl 
                     border border-white/10 rounded-2xl p-5 
                     overflow-hidden shadow-lg group"
        >

          {/* 🔥 GLOW BORDER */}
          <div className="absolute -inset-1 bg-gradient-to-r 
                          from-blue-500 via-purple-500 to-pink-500 
                          blur opacity-20 group-hover:opacity-40 transition">
          </div>

          {/* CONTENT */}
          <div className="relative z-10">

            <p className="text-lg font-semibold">
              Score:
              <span className="ml-2 px-3 py-1 rounded-lg 
                               bg-green-500/20 text-green-400">
                {item.finalScore || item.aiScore}
              </span>
            </p>

            <p><b>Similarity:</b> {item.similarity}%</p>
            <p><b>Plagiarism:</b> {item.plagiarism}%</p>

            <p className="mt-2 text-sm text-gray-300">
              {item.finalFeedback || item.aiFeedback}
            </p>

            {/* ACTIONS */}
            <div className="mt-4 flex gap-2">

              <button
                onClick={() => {
                  setEditId(item._id);
                  setNewScore(item.finalScore || item.aiScore);
                  setNewFeedback(item.finalFeedback || item.aiFeedback);
                }}
                className="px-3 py-1 rounded-lg text-white
                           bg-gradient-to-r from-blue-500 to-purple-500
                           hover:from-purple-500 hover:to-pink-500
                           transition duration-300"
              >
                Edit ✏️
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-1 rounded-lg text-white
                           bg-gradient-to-r from-red-500 to-pink-500
                           hover:opacity-80
                           transition duration-300"
              >
                Delete 🗑️
              </button>

            </div>

            {/* ✏️ EDIT BOX */}
            {editId === item._id && (
              <div className="mt-4">

                <input
                  type="number"
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                  className="w-full mb-2 p-2 rounded-lg bg-white/10"
                />

                <input
                  type="text"
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  className="w-full mb-2 p-2 rounded-lg bg-white/10"
                />

                <button
                  onClick={() => handleOverride(item._id)}
                  className="px-3 py-1 bg-green-500 rounded hover:bg-green-600"
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
);
}