import { useState } from "react";
import Navbar from "../components/Navbar"; // Ensure Navbar is imported
import "../css/EnrollMember.css";

export default function EnrollMember() {
    const [form, setForm] = useState({
        fullName: "",
        nickname: "",
        studentID: "",
        course: "",
        year: "",
        role: "",
        email: "",
        phoneNumber: "",
        profilePicture: "",
        dateJoined: new Date().toISOString().split("T")[0], // Auto-set current date
    });

    const [imageFileName, setImageFileName] = useState(""); // Track image file name
    const [message, setMessage] = useState("");

    // Function to handle form updates
    function updateForm(value) {
        setForm((prev) => ({
            ...prev,
            ...value,
        }));
    }

    // Function to handle image upload and convert to Base64 with preview
    function handleImageUpload(e) {
        const file = e.target.files[0];
        setImageFileName(file ? file.name : ""); // Set file name
        const reader = new FileReader();

        reader.onloadend = () => {
            updateForm({ profilePicture: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    // Function to handle form submission
    async function onSubmit(e) {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token"); // Get token from localStorage

            const response = await fetch("http://localhost:5050/members", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Add token to Authorization header
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Member enrolled successfully!");
                setForm({
                    fullName: "",
                    nickname: "",
                    studentID: "",
                    course: "",
                    year: "",
                    role: "",
                    email: "",
                    phoneNumber: "",
                    profilePicture: "",
                    dateJoined: new Date().toISOString().split("T")[0],
                });
                setImageFileName(""); // Reset image file name
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    }

    return (
        <>
            <Navbar /> {/* Navbar stays visible */}
            <div className="container mt-5">
                <h2 className="text-center mb-4">Enroll Member</h2>
                <div className="row g-4">
                    {/* Profile Picture Section */}
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <div
                            className="profile-picture-box"
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            {form.profilePicture ? (
                                <img
                                    src={form.profilePicture}
                                    alt="Profile Preview"
                                    className="profile-picture-preview"
                                />
                            ) : (
                                <span>No Image Selected</span>
                            )}
                        </div>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                        />
                        <div className="profile-picture-text">Profile Picture</div>
                        {imageFileName && (
                            <div className="image-filename" title={imageFileName}>
                                {imageFileName}
                            </div>
                        )}
                    </div>

                    {/* Form Section */}
                    <div className="col-md-8">
                        {message && <div className="alert alert-success">{message}</div>}
                        <form onSubmit={onSubmit}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={form.fullName}
                                        onChange={(e) => updateForm({ fullName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Nickname</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={form.nickname}
                                        onChange={(e) => updateForm({ nickname: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Student ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={form.studentID}
                                        onChange={(e) => updateForm({ studentID: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Course</label>
                                    <select
                                        className="form-select"
                                        value={form.course}
                                        onChange={(e) => updateForm({ course: e.target.value })}
                                        required
                                    >
                                        <option value="">Select a course</option>
                                        <option value="Info-Technology">Info-Technology</option>
                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                        <option value="Immersive Gaming">Immersive Gaming</option>
                                        <option value="Common ICT">Common ICT</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Year</label>
                                    <select
                                        className="form-select"
                                        value={form.year}
                                        onChange={(e) => updateForm({ year: e.target.value })}
                                        required
                                    >
                                        <option value="">Select a year</option>
                                        <option value="Year 1">Year 1</option>
                                        <option value="Year 2">Year 2</option>
                                        <option value="Year 3">Year 3</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Role</label>
                                    <select
                                        className="form-select"
                                        value={form.role}
                                        onChange={(e) => updateForm({ role: e.target.value })}
                                        required
                                    >
                                        <option value="">Select a role</option>
                                        <option value="President">President</option>
                                        <option value="Vice President">Vice President</option>
                                        <option value="Secretary">Secretary</option>
                                        <option value="Treasurer">Treasurer</option>
                                        <option value="Assistant">Assistant</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={(e) => updateForm({ email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        value={form.phoneNumber}
                                        onChange={(e) => updateForm({ phoneNumber: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary">
                                    Enroll Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
