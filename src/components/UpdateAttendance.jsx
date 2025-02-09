import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/UpdateAttendance.css";  // Ensure unique CSS file

export default function UpdateAttendance() {
    const [sessions, setSessions] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();
    const todayDate = formatDate(new Date());

    useEffect(() => {
        async function fetchSessions() {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5050/attendance/sessions", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setSessions(data.data);

                    // ✅ Automatically select the latest session and format it properly
                    if (data.data.length > 0) {
                        const latestSession = formatDate(data.data[data.data.length - 1].sessionDate);
                        fetchAttendance(latestSession);
                        setSelectedDate(latestSession); // ✅ Set the dropdown default
                    }
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        }

        async function fetchMembers() {
            try {
                const token = localStorage.getItem("token");

                const membersResponse = await fetch("http://localhost:5050/members", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!membersResponse.ok) throw new Error("Failed to fetch members");

                const membersData = await membersResponse.json();
                setMembers(membersData.data);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        }

        fetchSessions();
        fetchMembers();
    }, []);

    async function fetchAttendance(date) {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5050/attendance/date/${date}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setAttendanceRecords(data.data.records);
                setSelectedDate(date);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    }

    function handleAttendanceChange(memberId, status) {
        setAttendanceRecords(prevRecords =>
            prevRecords.map(record =>
                record.memberId === memberId ? { ...record, status } : record
            )
        );
    }

    async function updateAttendance() {
        const confirmUpdate = window.confirm("Are you sure you want to update the attendance?");
        if (!confirmUpdate) return; // If user clicks "Cancel", stop the function
        
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5050/attendance/date/${selectedDate}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ records: attendanceRecords }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Attendance updated successfully!");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error updating attendance:", error);
        }
    }

    function getMemberName(memberId) {
        const member = members.find(m => m._id === memberId);
        return member ? member.fullName : "Unknown";
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date)) return ""; // Handle invalid dates
        return date.toISOString().split("T")[0]; // ✅ Returns "YYYY-MM-DD"
    }

    return (
        <>
            <Navbar />
            <div className="update-attendance-container">
                <div className="update-attendance-info">
                    <div className="update-info-left">
                        <p><strong>Admin | IT Club</strong></p>
                        <p><strong>Date:</strong> {todayDate} <strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
                        <span className="update-legend present">P - Present</span>
                        <span className="update-legend absent">A - Absent</span>
                        <span className="update-legend valid-reason">VR - Valid Reason</span>
                        <br />
                        <label><strong>Select Attendance Date</strong></label>
                        <span>  </span>
                        <select
                            className="update-attendance-session-dropdown"
                            value={selectedDate} // ✅ Now selects latest session automatically
                            onChange={(e) => fetchAttendance(e.target.value)}
                        >
                            {sessions.map((session, index) => (
                                <option key={index} value={formatDate(session.sessionDate)}>
                                    {formatDate(session.sessionDate)} {/* ✅ Displays YYYY-MM-DD */}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="update-info-right">
                        <button onClick={updateAttendance} className="update-attendance-btn">
                            Update Attendance
                        </button>
                        <button onClick={() => navigate(-1)} className="update-back-btn">
                            Back
                        </button>
                    </div>
                </div>

                {selectedDate && (
                    <div className="update-take-attendance">
                        <div className="update-attendance-table-container">
                            <table className="update-attendance-table">
                                <thead>
                                    <tr>
                                        <th className="name-column">Name</th>
                                        <th className="present-header">P</th>
                                        <th className="absent-header">A</th>
                                        <th className="valid-reason-header">VR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceRecords.map(record => (
                                        <tr key={record.memberId}>
                                            <td>{getMemberName(record.memberId)}</td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name={record.memberId}
                                                    value="P"
                                                    checked={record.status === "P"}
                                                    onChange={() => handleAttendanceChange(record.memberId, "P")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name={record.memberId}
                                                    value="A"
                                                    checked={record.status === "A"}
                                                    onChange={() => handleAttendanceChange(record.memberId, "A")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name={record.memberId}
                                                    value="VR"
                                                    checked={record.status === "VR"}
                                                    onChange={() => handleAttendanceChange(record.memberId, "VR")}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
