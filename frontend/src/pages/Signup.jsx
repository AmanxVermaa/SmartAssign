import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError("All fields are required ❌");
      setSuccess("");
      return;
    }

    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      setSuccess("Signup Successful ✅");
      setError("");

      // 🔥 DIRECT LOGIN PAGE
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      const message = err.response?.data?.error;

      if (message === "User already exists") {
        setError("User already registered ❌");
      } else {
        setError("Signup failed ❌");
      }

      setSuccess("");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>
      <div style={{ marginTop: "20px" }}>
        <p>Already have an account?</p>
        <button onClick={() => navigate("/")}>Go to Login</button>
      </div>
    </div>
  );
}
