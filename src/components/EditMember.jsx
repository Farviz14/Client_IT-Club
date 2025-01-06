import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/EditMembers.css"; // Ensure the CSS is linked

export default function EditMember() {
    const { id } = useParams(); // Get the member ID from the URL
    const navigate = useNavigate();
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
    });
    const [imageFileName, setImageFileName] = useState(""); // Track image file name
    const [message, setMessage] = useState("");

    // Fetch the member data on component load
    useEffect(() => {
        fetchMemberData();
    }, []);

    // Fetch the specific member data
    const fetchMemberData = async () => {
        try {
            const token = localStorage.getItem("token"); // Get token from localStorage
            const response = await fetch(`http://localhost:5050/members/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setForm(data.data);
                setImageFileName("Image loaded"); // Show that the image is loaded
            } else {
                setMessage("Failed to load member data.");
            }
        } catch (error) {
            console.error("Error fetching member data:", error);
        }
    };

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

    // Function to handle form submission (PATCH request)
    async function onSubmit(e) {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token"); // Get token from localStorage

            // Remove the _id field before sending the request
            const { _id, ...updateData } = form;

            const response = await fetch(`http://localhost:5050/members/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Member updated successfully!");
                navigate("/home"); // Navigate back to the home page
            } else {
                setMessage(data.message || "Error updating member");
            }
        } catch (error) {
            console.error("Error updating member:", error);
            setMessage("Error updating member");
        }
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Edit Member</h2>
                {message && <div className="alert alert-danger">{message}</div>}
                <div className="row g-4">
                    {/* Profile Picture Section */}
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <div
                            className="edit-profile-picture-box"
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            {form.profilePicture ? (
                                <img
                                    src={form.profilePicture}
                                    alt="Profile Preview"
                                    className="edit-profile-picture-preview"
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
                        <div className="edit-profile-picture-text">Profile Picture</div>
                        {imageFileName && (
                            <div className="edit-image-filename" title={imageFileName}>
                                {imageFileName}
                            </div>
                        )}
                    </div>

                    {/* Form Section */}
                    <div className="col-md-8">
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
                                <button type="submit" className="btn btn-success">
                                    Update Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
