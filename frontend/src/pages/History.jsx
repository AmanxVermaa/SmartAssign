import { useEffect, useState } from "react";
import API from "../api/api";

export default function History() {
  const [data, setData] = useState([]);

  // 🔥 NEW STATES
  const [editId, setEditId] = useState(null);
  const [newScore, setNewScore] = useState("");
  const [newFeedback, setNewFeedback] = useState("");

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

  // 🔥 OVERRIDE FUNCTION
  const handleOverride = async (id) => {
    try {
      await API.put(`/override/${id}`, {
        score: newScore,
        feedback: newFeedback
      });

      alert("Updated ✅");
      setEditId(null);
      fetchData(); // refresh

    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  return (
    <div>
      <h1>Evaluation History 📊</h1>

      {data.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid white",
            margin: "10px",
            padding: "10px"
          }}
        >
          <p><b>Score:</b> {item.finalScore || item.aiScore}</p>
          <p><b>Feedback:</b> {item.finalFeedback || item.aiFeedback}</p>
          <p><b>Similarity:</b> {item.similarity}</p>
          <p><b>Plagiarism:</b> {item.plagiarism}</p>

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

          {/* 🔥 CONDITIONAL EDIT FORM */}
          {editId === item._id && (
            <div style={{ marginTop: "10px" }}>
              <input
                type="number"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                placeholder="New Score"
              />
              <br /><br />

              <input
                type="text"
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                placeholder="New Feedback"
              />
              <br /><br />

              <button onClick={() => handleOverride(item._id)}>
                Save ✅
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}