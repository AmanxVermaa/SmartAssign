import Navbar from "../components/Navbar";

export default function Profile() {
  const userName = localStorage.getItem("userName") || "User";
  const email = localStorage.getItem("userEmail") || "No Email";

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center
                      bg-[radial-gradient(circle_at_top_left,#1e293b,#020617,#000)] text-white">

        <div className="w-96 p-8 rounded-2xl
                        bg-white/10 backdrop-blur-2xl
                        border border-white/20
                        text-center">

          <div className="w-20 h-20 mx-auto mb-4 rounded-full
                          bg-gradient-to-r from-blue-500 to-purple-500
                          flex items-center justify-center text-2xl font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>

          <h2 className="text-xl font-semibold">{userName}</h2>
          <p className="text-gray-400 text-sm mt-1">{email}</p>

          <div className="mt-6 text-sm text-gray-300">
            <p>Total Evaluations: --</p>
            <p>Joined: --</p>
          </div>

        </div>
      </div>
    </>
  );
}