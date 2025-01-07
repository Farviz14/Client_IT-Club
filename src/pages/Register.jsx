import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Register.css"; // Correct path to the CSS file
import logo from "../images/Logo.png"; // Import the logo image

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Function to handle form submission
    async function handleRegister(e) {
        e.preventDefault();

        const response = await fetch("http://localhost:5050/admins/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Admin registered successfully!");
            navigate("/login");
        } else {
            alert(data.message);
        }
    }

    return (
        <div className="register-page">
            <div className="register-card">
                {/* Logo at the top of the register card */}
                <div className="logo-container">
                    <img src={logo} alt="Temasek Polytechnic Logo" className="register-logo" />
                </div>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="name" className="register-name-label">Full Name</label>
                        <input
                            type="text"
                            className="register-name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="register-email-label">Email address</label>
                        <input
                            type="email"
                            className="register-email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="register-password-label">Password</label>
                        <input
                            type="password"
                            className="register-password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                    <div className="text-center">
                        <Link to="/login" className="text-decoration-none text-primary">
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
