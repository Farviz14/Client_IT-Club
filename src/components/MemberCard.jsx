import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import "../css/MemberCard.css"; // Ensure the CSS is linked

export default function MemberCard({ member, onEdit, onDelete }) {
    const [showOptions, setShowOptions] = useState(false);

    // Border colors based on year
    const borderColor =
        member.year === "Year 1"
            ? "#0ac24d"
            : member.year === "Year 2"
            ? "#007bff"
            : "#ff0000";

    return (
        <div className="member-card" style={{ borderColor }}>
            {/* Options Button */}
            <div
                className="options-menu"
                onMouseEnter={() => setShowOptions(true)}
                onMouseLeave={() => setShowOptions(false)}
            >
                <FaEllipsisV style={{ cursor: "pointer" }} />
                {showOptions && (
                    <div className="dropdown-menu show">
                        <button
                            className="dropdown-item"
                            onClick={() => onEdit(member)}
                        >
                            Edit
                        </button>
                        <button
                            className="dropdown-item text-danger"
                            onClick={() => onDelete(member._id)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Image Container */}
            <div className="image-container">
                <img
                    src={member.profilePicture || "https://via.placeholder.com/150"}
                    alt={`${member.nickname}'s profile`}
                />
            </div>

            {/* Details Container */}
            <div className="details-container">
                <h5>Name: {member.nickname}</h5>
                <p>Role: {member.role}</p>
                <p>Course: {member.course}</p>
            </div>
        </div>
    );
}
