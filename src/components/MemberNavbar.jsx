import { NavLink } from "react-router-dom";
import "../css/NavBar.css"; // Import the CSS file
import logo from "../images/Logo.png"; // Import the logo image

function MemberNavbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* Logo on the left */}
                <NavLink className="navbar-brand" to="/member-home">
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
                                to="/member-home"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/event-calendar"
                            >
                                Event Calendar
                            </NavLink>
                        </li>
                    </ul>

                    {/* Centered Title */}
                    <div className="text-center flex-grow-1">
                        <h5 className="member-Navbar-header">Member Portal</h5>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default MemberNavbar;
