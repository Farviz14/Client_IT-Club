import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Navbar from "../components/Navbar";
import "../css/AdminCalendar.css";

export default function AdminCalendar() {
    const [events, setEvents] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [eventData, setEventData] = useState({
        title: "",
        date: "",
        venue: "",
        description: "",
        type: "",
    });

    async function fetchEvents() {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5050/calendar", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (response.ok) {
                const formattedEvents = data.data.map(event => ({
                    id: event._id,
                    title: event.title.trim().replace(/[^a-zA-Z0-9\s]/g, ''),
                    start: formatDateString(event.date),
                    venue: event.venue,
                    description: event.description,
                    type: event.type || "Engagement",
                    backgroundColor: event.type === "Meeting" ? "#dc3545" : "#28a745",
                }));
                setEvents(formattedEvents);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    function formatDateString(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        return isNaN(date) ? "" : date.toISOString().split("T")[0];
    }

    function handleDateSelect(info) {
        const selectedDate = new Date(info.startStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare only dates
    
        if (selectedDate < today) {
            alert("This is a past date, you cannot add an event.");
            return;
        }
    
        setEventData({ title: "", date: info.startStr, venue: "", description: "", type: "Engagement" });
        setShowAddModal(true);
    }
    

    async function handleEventClick(info) {
        const eventId = info.event.id;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5050/calendar/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (response.ok) {
                setSelectedEventId(eventId);
                setEventData({
                    title: data.data.title.trim().replace(/[^a-zA-Z0-9\s]/g, ''),
                    date: formatDateString(data.data.date),
                    venue: data.data.venue,
                    description: data.data.description,
                    type: data.data.type || "Engagement",
                });
                setShowEditModal(true);
            } else {
                alert("Event not found.");
            }
        } catch (error) {
            console.error("Error fetching event details:", error);
        }
    }

    function handleChange(e) {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    }

    async function handleAddEvent(e) {
        e.preventDefault();
        if (!eventData.title || !eventData.date || !eventData.venue || !eventData.description) {
            alert("Please fill in all fields!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await fetch("http://localhost:5050/calendar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(eventData),
            });

            alert("Event added successfully!");
            fetchEvents();
            setShowAddModal(false);
        } catch (error) {
            console.error("Error adding event:", error);
        }
    }

    async function handleUpdateEvent(e) {
        e.preventDefault();
        if (!eventData.title || !eventData.date || !eventData.venue || !eventData.description) {
            alert("Please fill in all fields!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:5050/calendar/${selectedEventId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(eventData),
            });

            alert("Event updated successfully!");
            fetchEvents();
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating event:", error);
        }
    }

    async function handleDeleteEvent() {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:5050/calendar/${selectedEventId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Event deleted successfully!");
            fetchEvents();
            setShowEditModal(false);
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    }

    return (
        <>
            <Navbar />
            <div className="admin-calendar-container">
                <div className="admin-calendar-header">
                    <h2>Admin Event Calendar</h2>
                    <div className="event-legend">
                        <span className="legend-item engagement">Engagement</span>
                        <span className="legend-item meeting">Meeting</span>
                    </div>
                </div>

                <div className="calendar-wrapper">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        selectable={true}
                        select={handleDateSelect}
                        events={events}
                        eventClick={handleEventClick}
                        height="auto"
                    />
                </div>

                {/* Add Event Modal */}
                {showAddModal && (
                    <div className="overlay">
                        <div className="event-dialog">
                            <h3>Add Event</h3>
                            <form onSubmit={handleAddEvent}>
                                <label>Title</label>
                                <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
                                <label>Date</label>
                                <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
                                <label>Venue</label>
                                <input type="text" name="venue" value={eventData.venue} onChange={handleChange} required />
                                <label>Description</label>
                                <textarea name="description" value={eventData.description} onChange={handleChange} required></textarea>
                                <label>Type</label>
                                <select name="type" value={eventData.type} onChange={handleChange} required>
                                    <option value="Engagement">Engagement</option>
                                    <option value="Meeting">Meeting</option>
                                </select>
                                <button className= "add-btn" type="submit">Add</button>
                                <button className= "add-cancel-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}

                {/*  Edit/Delete Event Modal */}
                {showEditModal && (
                    <div className="overlay">
                        <div className="edit-event-dialog">
                            <h3>Manage Event</h3>
                            <form onSubmit={handleUpdateEvent}>
                                <label>Title</label>
                                <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
                                <label>Date</label>
                                <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
                                <label>Venue</label>
                                <input type="text" name="venue" value={eventData.venue} onChange={handleChange} required />
                                <label>Description</label>
                                <textarea name="description" value={eventData.description} onChange={handleChange} required></textarea>
                                <label>Type</label>
                                <select name="type" value={eventData.type} onChange={handleChange} required>
                                    <option value="Engagement">Engagement</option>
                                    <option value="Meeting">Meeting</option>
                                </select>
                                <button type="submit" className="update-btn">Update</button>
                                <button className= "delete-btn"onClick={handleDeleteEvent}>Delete</button>
                                <button className= "edit-cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
