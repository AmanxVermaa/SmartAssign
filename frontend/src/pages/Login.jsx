import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data);
      alert("Login Failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login 🔐</h2>

      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />
      </div>

      <div style={{ marginTop: "15px" }}>
        <button onClick={handleLogin}>Login</button>
      </div>

      {/* 🔥 SIGNUP OPTION */}
      <div style={{ marginTop: "20px" }}>
        <p>Don't have an account?</p>
        <button onClick={() => navigate("/signup")}>
          Go to Signup
        </button>
      </div>
    </div>
  );
}