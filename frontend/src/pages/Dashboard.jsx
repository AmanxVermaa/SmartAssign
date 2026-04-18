import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [studentFile, setStudentFile] = useState(null);
  const [teacherFile, setTeacherFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  if (!studentFile || !teacherFile) {
    alert("Please upload both files ❌");
    return;
  }

  const formData = new FormData();
  formData.append("studentFile", studentFile);
  formData.append("teacherFile", teacherFile);

  try {
    setLoading(true); // 🔥 START LOADING

    const res = await API.post("/full-evaluate", formData);

    console.log(res.data);
    setResult(res.data.result);

  } catch (err) {
    console.log(err);
    alert("Upload failed ❌");
  } finally {
    setLoading(false); // 🔥 STOP LOADING (IMPORTANT)
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
  <div className="min-h-screen p-6
                  bg-[linear-gradient(135deg,#0f172a,#020617,#000000)] text-white">

    {/* 🔝 HEADER */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Dashboard 🚀</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg 
                   bg-red-500 hover:bg-red-600 
                   transition shadow-md"
      >
        Logout
      </button>
    </div>

    {/* 📂 UPLOAD SECTION */}
    <div className="grid md:grid-cols-2 gap-6">

      {/* STUDENT FILE */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 
                      rounded-2xl p-6 text-center
                      hover:scale-105 transition duration-300">

        <h2 className="mb-4 text-lg">Student File 📄</h2>

        <input
          type="file"
          onChange={(e) => setStudentFile(e.target.files[0])}
          className="w-full text-sm"
        />

        {studentFile && (
          <p className="mt-3 text-green-400 text-sm">
            {studentFile.name}
          </p>
        )}
      </div>

      {/* TEACHER FILE */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 
                      rounded-2xl p-6 text-center
                      hover:scale-105 transition duration-300">

        <h2 className="mb-4 text-lg">Teacher File 📄</h2>

        <input
          type="file"
          onChange={(e) => setTeacherFile(e.target.files[0])}
          className="w-full text-sm"
        />

        {teacherFile && (
          <p className="mt-3 text-green-400 text-sm">
            {teacherFile.name}
          </p>
        )}
      </div>
    </div>

    {/* 🚀 EVALUATE BUTTON */}
    <div className="mt-8 text-center">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-8 py-3 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-blue-500 to-purple-500
                  hover:from-purple-500 hover:to-pink-500
                  transition duration-300
                  shadow-lg shadow-blue-500/30
                  disabled:opacity-50"
      >
        {loading ? "Evaluating... ⏳" : "Evaluate 🚀"}
      </button>
    </div>

    {/* ⏳ LOADING */}
    {loading && (
      <div className="mt-6 text-center">
        <p className="animate-pulse text-blue-400">
          Evaluating... ⏳
        </p>
      </div>
    )}

    {/* 📊 RESULT */}
    {result && (
      <div className="mt-10 bg-white/5 backdrop-blur-lg 
                      border border-white/10 rounded-2xl p-6">

        <h2 className="text-xl mb-4">Result 📊</h2>

        <div className="space-y-3">

          <p>Score: <span className="text-green-400">{result.score}</span></p>
          <p>Similarity: {result.similarity}%</p>
          <p>Plagiarism: {result.plagiarism}%</p>

          <div>
            <p className="mb-1">Feedback:</p>
            <p className="text-gray-300 text-sm">
              {result.feedback}
            </p>
          </div>

        </div>
      </div>
    )}

    {/* 📜 HISTORY BUTTON */}
    <div className="mt-8 text-center">
      <button
        onClick={() => navigate("/history")}
        className="px-6 py-2 rounded-lg 
                   bg-purple-500 hover:bg-purple-600 
                   transition"
      >
        View History 📜
      </button>
    </div>

  </div>
);
}
