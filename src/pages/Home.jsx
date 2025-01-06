import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar"; // Importing Navbar
import MemberCard from "../components/MemberCard";

export default function Home() {
    const [members, setMembers] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchMembers();
    }, []);

    // Fetch members from the backend with token authorization
    const fetchMembers = async () => {
        try {
            const token = localStorage.getItem("token"); // Get the token from localStorage

            const response = await fetch("http://localhost:5050/members", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
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

    // Handle member edit
    const handleEdit = (member) => {
        navigate(`/edit/${member._id}`); // Navigate to EditMember page with the member ID
    };

    // Handle member delete with token authorization
    const handleDelete = async (memberId) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            try {
                const token = localStorage.getItem("token"); // Get the token from localStorage

                const response = await fetch(`http://localhost:5050/members/${memberId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    setMembers(members.filter((m) => m._id !== memberId));
                    alert("Member deleted successfully.");
                } else {
                    const data = await response.json();
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error deleting member:", error);
            }
        }
    };

    return (
        <>
            <Navbar /> {/* Navbar stays visible */}
            <div className="container mt-5">
                <h2 className="text-center mb-4">Members List</h2>
                <div className="d-flex flex-wrap justify-content-center">
                    {members.map((member) => (
                        <MemberCard
                            key={member._id}
                            member={member}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
