import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [studentFile, setStudentFile] = useState(null);
  const [teacherFile, setTeacherFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("studentFile", studentFile);
    formData.append("teacherFile", teacherFile);

    try {
      const res = await API.post("/full-evaluate", formData);

      console.log(res.data);
      setResult(res.data.result);
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        style={{ float: "right", marginBottom: "10px" }}
      >
        Logout 🚪
      </button>

      <h1>Dashboard 🚀</h1>

      <input type="file" onChange={(e) => setStudentFile(e.target.files[0])} />
      <br />
      <br />

      <input type="file" onChange={(e) => setTeacherFile(e.target.files[0])} />
      <br />
      <br />

      <button onClick={handleSubmit}>Upload & Evaluate</button>

      {result && (
        <div>
          <h2>Result:</h2>
          <p>Score: {result.score}</p>
          <p>Feedback: {result.feedback}</p>
          <p>Similarity: {result.similarity}</p>
          <p>Plagiarism: {result.plagiarism}</p>
        </div>
      )}
      <button onClick={() => navigate("/history")}>View History</button>
    </div>
  );
}
