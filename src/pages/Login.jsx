import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState(""); // Added state for feedback message
    const navigate = useNavigate();

    // Function to update form state
    function updateForm(value) {
        setForm((prev) => ({
            ...prev,
            ...value,
        }));
    }

    // Function to handle form submission
    async function onSubmit(e) {
        e.preventDefault();

        const loginAdmin = { ...form };

        try {
            const response = await fetch('http://localhost:5050/admins/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginAdmin),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setMessage("Login successful!");
                setTimeout(() => {
                    navigate('/home');
                }, 2000); // Redirect after 2 seconds
            } else {
                setMessage(data.message); // Show error message
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }

        setForm({ email: '', password: '' });
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4 shadow-sm" style={{ width: '24rem' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={form.email}
                            onChange={(e) => updateForm({ email: e.target.value })}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={form.password}
                            onChange={(e) => updateForm({ password: e.target.value })}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <div className="text-center">
                        <Link to="/register" className="text-decoration-none text-primary">
                            Register (Admins Only)
                        </Link>
                    </div>
                    {message && (
                        <div className={`mt-3 text-center ${message.includes("successful") ? "text-success" : "text-danger"}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
