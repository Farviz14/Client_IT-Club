import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Login.css'; // Correct path to the CSS file
import logo from '../images/Logo.png'; // Import the logo image

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
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
                alert('Login successful!');
                navigate('/home');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }

        setForm({ email: '', password: '' });
    }

    return (
        <div className="login-page">
            <div className="login-card">
                {/* Logo at the top of the login card */}
                <div className="logo-container">
                    <img src={logo} alt="Temasek Polytechnic Logo" className="login-logo" />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="login-email-label">Email address</label>
                        <input
                            type="email"
                            className="login-email"
                            id="email"
                            value={form.email}
                            onChange={(e) => updateForm({ email: e.target.value })}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="login-password-label">Password</label>
                        <input
                            type="password"
                            className="login-password"
                            id="password"
                            value={form.password}
                            onChange={(e) => updateForm({ password: e.target.value })}
                            placeholder="Enter your password"
                            required
                        />
                        {/* Forget Password Link */}
                        <div className="text-end mt-2">
                            <Link to="/forget-password" className="forget-password-disabled">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <div className="text-center">
                        <Link to="/register" className="text-decoration-none text-primary">
                            Register (Admins Only)
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
