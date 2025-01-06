import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
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
            setMessage("Admin registered successfully!");
            setTimeout(() => {
                navigate("/login");
            }, 2000); // Redirect to login page after 2 seconds
        } else {
            setMessage(data.message);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4 shadow-sm" style={{ width: '24rem' }}>
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
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
                    {message && (
                        <div className={`mt-3 text-center ${message.includes("successfully") ? "text-success" : "text-danger"}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Register;
