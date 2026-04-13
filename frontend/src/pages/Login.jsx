import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () =>{
        try {
            const res = await API.post("auth/login", {
                email,
                password
            });

            console.log(res.data);

            localStorage.setItem("token", res.data.token);

            alert("Login Successful");
            navigate("/dashboard");
        } catch(err) {
            console.log(err.response?.data);
            alert("Login Failed");
        }
    };
    
    return (
        <div>
            <h2>Login</h2>

            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}