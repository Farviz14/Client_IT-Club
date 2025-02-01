import React, { useEffect, useState } from "react";
import MemberNavbar from "../components/MemberNavbar"; // Updated Navbar for members
import MemberHomeCard from "../components/MemberHomeCard"; // Assuming MemberCard exists
import "../css/MemberCard.css"; // Link to CSS file

function MemberHome() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchMembers();
    }, []);

    // Fetch members from the backend
    const fetchMembers = async () => {
        try {

            const response = await fetch("http://localhost:5050/members/memberhome", {
                method: "GET",
            });

            const data = await response.json();

            if (response.ok) {
                setMembers(data.data);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    return (
        <>
            <MemberNavbar /> {/* Use updated MemberNavbar */}
            <div className="container mt-5">
                <h2 className="text-center mb-4">Members</h2>
                <div className="scrollable-container d-flex flex-wrap justify-content-center">
                    {members.map((member) => (
                        <MemberHomeCard
                            key={member._id}
                            member={member}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default MemberHome;
