import { useState } from "react";
import API from "../api/api";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, SEtEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            await API.post("/auth/signup", {
                name,
                email,
                password
            });

            alert ("Signup Successful");
        } catch (err) {
            alert("Signup failed");
        }
    };

    return (
        <div>
            <h2>Signup</h2>

            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}