import React from "react";
import "../css/MemberCard.css"; // Ensure the CSS is linked

export default function MemberHomeCard({ member }) {
    // Border colors based on year
    const borderColor =
        member.year === "Year 1"
            ? "#0ac24d"
            : member.year === "Year 2"
            ? "#007bff"
            : "#ff0000";

    return (
        <div className="member-card" style={{ borderColor }}>
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
