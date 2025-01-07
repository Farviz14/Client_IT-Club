import { NavLink, useNavigate } from "react-router-dom";
import "../css/NavBar.css"; // Import the CSS file
import logo from "../images/Logo.png"; // Import the logo image
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"; // Import profile and logout icons

function Navbar() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email"); // Get the stored email address from localStorage

    // Function to handle logout
    function handleLogout() {
        localStorage.removeItem("token"); // Remove the token from localStorage
        localStorage.removeItem("email"); // Remove the email from localStorage
        navigate("/login"); // Redirect to login page
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* Logo on the left */}
                <NavLink className="navbar-brand" to="/home">
                    <img src={logo} alt="IT Club Logo" className="navbar-logo" />
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/home"
                                activeClassName="active"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/enroll"
                                activeClassName="active"
                            >
                                Enroll Member
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link disabled">
                                Attendance
                            </span>
                        </li>
                    </ul>

                    {/* Profile Icon with Email */}
                    <ul className="navbar-nav">
                        {email && (
                            <li className="nav-item d-flex align-items-center">
                                <FaUserCircle size={24} className="me-2 profile-icon" />
                                <span className="profile-email">{email}</span>
                            </li>
                        )}
                        <li className="nav-item">
                            <button
                                className="btn btn-outline-danger d-flex align-items-center"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt className="me-2" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
