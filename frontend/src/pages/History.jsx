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

  const handleSort = () => {
    let sortedData = [...data];

    if (sortType === "high") {
      sortedData.sort(
        (a, b) => (b.finalScore || b.aiScore) - (a.finalScore || a.aiScore),
      );
    }

    if (sortType === "low") {
      sortedData.sort(
        (a, b) => (a.finalScore || a.aiScore) - (b.finalScore || b.aiScore),
      );
    }

    if (sortType === "latest") {
      sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (sortType === "oldest") {
      sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setData(sortedData);
  };

  return (
    <div>
      <h1>Evaluation History 📊</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Min Score"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
        />

        <button onClick={handleFilter} style={{ marginLeft: "10px" }}>
          Apply Filter 🔍
        </button>

        <button onClick={fetchData} style={{ marginLeft: "10px" }}>
          Reset 🔄
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort By</option>
          <option value="high">Highest Score</option>
          <option value="low">Lowest Score</option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>

        <button onClick={handleSort} style={{ marginLeft: "10px" }}>
          Apply Sort 🔃
        </button>

        <button onClick={fetchData} style={{ marginLeft: "10px" }}>
          Reset 🔄
        </button>
      </div>
      {data.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid white",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p>
            <b>Score:</b> {item.finalScore || item.aiScore}
          </p>
          <p>
            <b>Feedback:</b> {item.finalFeedback || item.aiFeedback}
          </p>
          <p>
            <b>Similarity:</b> {item.similarity}
          </p>
          <p>
            <b>Plagiarism:</b> {item.plagiarism}
          </p>

          {/* 🔥 OVERRIDE BUTTON */}
          <button
            onClick={() => {
              setEditId(item._id);
              setNewScore(item.finalScore || item.aiScore);
              setNewFeedback(item.finalFeedback || item.aiFeedback);
            }}
          >
            Override ✏️
          </button>

          <button
            onClick={() => handleDelete(item._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete 🗑️
          </button>
          {/* 🔥 CONDITIONAL EDIT FORM */}
          {editId === item._id && (
            <div style={{ marginTop: "10px" }}>
              <input
                type="number"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                placeholder="New Score"
              />
              <br />
              <br />

              <input
                type="text"
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                placeholder="New Feedback"
              />
              <br />
              <br />

              <button onClick={() => handleOverride(item._id)}>Save ✅</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
