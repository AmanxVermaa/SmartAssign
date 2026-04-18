import { useEffect, useState } from "react";
import API from "../api/api";

export default function History() {
  const [data, setData] = useState([]);

  // 🔥 NEW STATES
  const [editId, setEditId] = useState(null);
  const [newScore, setNewScore] = useState("");
  const [newFeedback, setNewFeedback] = useState("");
  const [minScore, setMinScore] = useState("");
  const [sortType, setSortType] = useState("");

  const fetchData = async () => {
    try {
      const res = await API.get("/evaluations");
      setData(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load history");
    }
  };

  const handleFilter = async () => {
    try {
      const res = await API.get(`/evaluations/filter?minScore=${minScore}`);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Filter failed ❌");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 OVERRIDE FUNCTION
  const handleOverride = async (id) => {
    try {
      await API.put(`/override/${id}`, {
        score: newScore,
        feedback: newFeedback,
      });

      alert("Updated ✅");
      setEditId(null);
      fetchData(); // refresh
    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await API.delete(`/evaluations/${id}`);

      // UI update (without reload)
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

const handleSort = (type) => {
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

  return (
  <div className="min-h-screen p-6 
                  bg-[linear-gradient(135deg,#0f172a,#020617,#000000)] text-white">

    <h1 className="text-3xl font-bold mb-6">
      Evaluation History 📊
    </h1>

    {/* 🔧 FILTER + SORT BAR */}
    <div className="flex flex-wrap gap-3 mb-6">

      <input
        type="number"
        placeholder="Min Score"
        value={minScore}
        onChange={(e) => setMinScore(e.target.value)}
        className="p-2 rounded bg-white/10 border border-white/10"
      />

      <button
        onClick={handleFilter}
        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
      >
        Filter 🔍
      </button>

      <select
        onChange={(e) => handleSort(e.target.value)}
        className="p-2 rounded-lg 
                  bg-[#020617] text-white 
                  border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  cursor-pointer"
      >
        <option value="" className="bg-[#020617] text-white">
          Sort By
        </option>
        <option value="high" className="bg-[#020617]">
          Highest Score
        </option>
        <option value="low" className="bg-[#020617]">
          Lowest Score
        </option>
        <option value="latest" className="bg-[#020617]">
          Latest
        </option>
        <option value="oldest" className="bg-[#020617]">
          Oldest
        </option>
      </select>

      <button
        onClick={handleSort}
        className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
      >
        Apply Sort 🔃
      </button>

      <button
        onClick={fetchData}
        className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
      >
        Reset 🔄
      </button>

    </div>

    {/* 📦 CARDS GRID */}
    <div className="grid md:grid-cols-2 gap-6">

      {data.map((item) => (
        <div
          key={item._id}
          className="bg-white/5 backdrop-blur-lg border border-white/10 
                     rounded-2xl p-5
                     hover:scale-105 transition duration-300 shadow-md"
        >

          <p>
            <b>Score:</b>{" "}
            <span className="text-green-400">
              {item.finalScore || item.aiScore}
            </span>
          </p>

          <p><b>Similarity:</b> {item.similarity}%</p>
          <p><b>Plagiarism:</b> {item.plagiarism}%</p>

          <p className="mt-2 text-sm text-gray-300">
            {item.finalFeedback || item.aiFeedback}
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-4 flex gap-2">

            <button
              onClick={() => {
                setEditId(item._id);
                setNewScore(item.finalScore || item.aiScore);
                setNewFeedback(item.finalFeedback || item.aiFeedback);
              }}
              className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
            >
              Edit ✏️
            </button>

            <button
              onClick={() => handleDelete(item._id)}
              className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
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
                className="w-full mb-2 p-2 rounded bg-white/10"
              />

              <input
                type="text"
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                className="w-full mb-2 p-2 rounded bg-white/10"
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
      ))}

    </div>
  </div>
);
}
