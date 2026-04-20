import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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
      setLoading(true);

      const res = await API.post("/full-evaluate", formData);
      setResult(res.data.result);

    } catch (err) {
      console.log(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">

      {/* 🔝 NAVBAR */}
      <Navbar />

      {/* 🔐 MAIN */}
      <div className="flex-1 p-6
                      bg-[radial-gradient(circle_at_top_left,#1e293b,#020617,#000)]
                      relative overflow-hidden text-white">

        {/* 🌈 BLOBS */}
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

        {/* 🔝 HEADER */}
        <div className="relative z-10 flex justify-between items-center mb-10">

          <h1 className="text-3xl font-bold tracking-wide">
            Dashboard 🚀
          </h1>


        </div>

        {/* 📦 UPLOAD CARDS */}
        <div className="relative z-10 grid md:grid-cols-2 gap-6">

          {/* 📄 STUDENT */}
          <div className="relative group">

            <div className="absolute -inset-1 bg-gradient-to-r 
                            from-blue-500 via-purple-500 to-pink-500 
                            blur opacity-20 rounded-2xl" />

            <div className="relative p-6 rounded-2xl
                            bg-white/10 backdrop-blur-2xl
                            border border-white/20">

              <h2 className="text-lg font-semibold mb-4">
                Student File 📄
              </h2>

              <input
                type="file"
                onChange={(e) => setStudentFile(e.target.files[0])}
                className="w-full text-sm cursor-pointer"
              />

              {studentFile && (
                <p className="mt-3 text-green-400 text-sm">
                  {studentFile.name}
                </p>
              )}

            </div>
          </div>

          {/* 📄 TEACHER */}
          <div className="relative group">

            <div className="absolute -inset-1 bg-gradient-to-r 
                            from-purple-500 via-pink-500 to-blue-500 
                            blur opacity-20 rounded-2xl" />

            <div className="relative p-6 rounded-2xl
                            bg-white/10 backdrop-blur-2xl
                            border border-white/20">

              <h2 className="text-lg font-semibold mb-4">
                Teacher File 📄
              </h2>

              <input
                type="file"
                onChange={(e) => setTeacherFile(e.target.files[0])}
                className="w-full text-sm cursor-pointer"
              />

              {teacherFile && (
                <p className="mt-3 text-green-400 text-sm">
                  {teacherFile.name}
                </p>
              )}

            </div>
          </div>

        </div>

        {/* 🚀 BUTTON */}
        <div className="relative z-10 mt-10 text-center">

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-10 py-3 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-blue-500 to-purple-500
                       hover:from-purple-500 hover:to-pink-500
                       transition duration-300
                       shadow-lg shadow-blue-500/30
                       hover:shadow-purple-500/50
                       disabled:opacity-50"
          >
            {loading ? "Evaluating... ⏳" : "Evaluate 🚀"}
          </button>

        </div>

        {/* 📊 RESULT */}
        {result && (
          <div className="relative z-10 mt-12 max-w-xl mx-auto">

            <div className="absolute -inset-1 bg-gradient-to-r 
                            from-green-400 via-blue-500 to-purple-500 
                            blur opacity-20 rounded-2xl" />

            <div className="relative p-6 rounded-2xl
                            bg-white/10 backdrop-blur-2xl
                            border border-white/20 text-center">

              <h2 className="text-xl font-semibold mb-4">
                Result 📊
              </h2>

              <p className="text-green-400 text-2xl font-bold">
                Score: {result.score}
              </p>

              <p className="mt-2 text-gray-300">
                {result.feedback}
              </p>

              <div className="mt-4 text-sm text-gray-400">
                <p>Similarity: {result.similarity}%</p>
                <p>Plagiarism: {result.plagiarism}%</p>
              </div>

            </div>
          </div>
        )}

        {/* 🔗 HISTORY */}
        <div className="relative z-10 mt-12 text-center">

          <button
            onClick={() => navigate("/history")}
            className="px-6 py-2 rounded-xl text-white
                       bg-gradient-to-r from-gray-600 to-gray-800
                       hover:scale-105 transition duration-300"
          >
            View History 📜
          </button>

        </div>

      </div>
    </div>
  );
}