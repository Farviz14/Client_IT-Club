import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/Attendance.css";

export default function Attendance() {
    const [members, setMembers] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [attendanceExists, setAttendanceExists] = useState(false);
    const navigate = useNavigate();
    
    const todayDate = new Date().toISOString().split("T")[0];

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem("token");

                const membersResponse = await fetch("http://localhost:5050/members", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!membersResponse.ok) throw new Error("Failed to fetch members");

                const membersData = await membersResponse.json();
                setMembers(membersData.data);

                const initialAttendance = {};
                membersData.data.forEach(member => {
                    initialAttendance[member._id] = "";
                });
                setAttendance(initialAttendance);

                const attendanceResponse = await fetch(`http://localhost:5050/attendance/date/${todayDate}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (attendanceResponse.ok) {
                    setAttendanceExists(true);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    function handleAttendanceChange(memberId, status) {
        setAttendance(prev => ({
            ...prev,
            [memberId]: status
        }));
    }

    async function submitAttendance(e) {
        const confirmAttendance = window.confirm("Are you sure you want to submit the attendance?");
        if (!confirmAttendance) return; // If user clicks "Cancel", stop the function

        e.preventDefault();
        
        if (Object.values(attendance).some(value => value === "")) {
            alert("Please mark attendance for all members.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const records = Object.entries(attendance).map(([memberId, status]) => ({
                memberId,
                status
            }));

            const response = await fetch("http://localhost:5050/attendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ sessionDate: todayDate, records })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Attendance submitted successfully!");
                setAttendanceExists(true);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Error submitting attendance: " + error.message);
        }
    }

    return (
        <>
            <Navbar />
            <div className="attendance-container">
                <div className="attendance-info">
                    <div className="info-left">
                        <p><strong>Admin | IT Club</strong></p>
                        <p><strong>Date:</strong> {todayDate} <strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
                        <span className="legend present">P - Present</span>
                        <span className="legend absent">A - Absent</span>
                        <span className="legend valid-reason">VR - Valid Reason</span>
                    </div>
                    <div className="info-right">
                        <button type="submit" className="attendance-submit-btn" onClick={submitAttendance} disabled={attendanceExists}>{attendanceExists ? "Attendance Taken" : "Submit Attendance"}</button>
                        <button className="view-attendance-btn" onClick={() => navigate("/update-attendance")}>View all attendance</button>
                    </div>
                </div>

                <div className="take-attendance">
                    <table className="attendance-table-header">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Year</th>
                                <th>Course</th>
                                <th className="attendance-present">P</th>
                                <th className="attendance-absent">A</th>
                                <th className="attendance-valid-reason">VR</th>
                            </tr>
                        </thead>
                    </table>

                    <div className="attendance-table-container">
                        <table className="attendance-table">
                            <tbody>
                                {members.map(member => (
                                    <tr key={member._id}>
                                        <td>{member.fullName}</td>
                                        <td>{member.year}</td>
                                        <td>{member.course}</td>
                                        <td>
                                            <input type="radio" name={member._id} value="P" checked={attendance[member._id] === "P"} onChange={() => handleAttendanceChange(member._id, "P")} disabled={attendanceExists} />
                                        </td>
                                        <td>
                                            <input type="radio" name={member._id} value="A" checked={attendance[member._id] === "A"} onChange={() => handleAttendanceChange(member._id, "A")} disabled={attendanceExists} />
                                        </td>
                                        <td>
                                            <input type="radio" name={member._id} value="VR" checked={attendance[member._id] === "VR"} onChange={() => handleAttendanceChange(member._id, "VR")} disabled={attendanceExists} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
