import { NavLink, useNavigate } from "react-router-dom";
import "../css/NavBar.css"; // Import the CSS file

function Navbar() {
    const navigate = useNavigate();

    // Function to handle logout
    function handleLogout() {
        localStorage.removeItem("token"); // Remove the token from localStorage
        navigate("/login"); // Redirect to login page
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/home">
                    IT Club
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
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button
                                className="btn btn-outline-danger"
                                onClick={handleLogout}
                            >
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
