import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import MemberNavbar from "../components/MemberNavbar";
import "../css/MemberCalendar.css"; // New CSS file for Member Calendar

export default function MemberCalendar() {
    const [events, setEvents] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    async function fetchEvents() {
        try {
            const response = await fetch("http://localhost:5050/calendar/membercalendar", {
            });

            const data = await response.json();
            if (response.ok) {
                const formattedEvents = data.data.map(event => ({
                    id: event._id,
                    title: event.title.trim().replace(/[^a-zA-Z0-9\s]/g, ''),
                    start: formatDateString(event.date),
                    venue: event.venue,
                    description: event.description,
                    type: event.type,
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

    function handleEventClick(info) {
        const clickedEvent = events.find(event => event.id === info.event.id);
        if (clickedEvent) {
            setSelectedEvent(clickedEvent);
            setShowDetailsModal(true);
        }
    }

    return (
        <>
            <MemberNavbar />
            <div className="member-calendar-container">
                <div className="member-calendar-header">
                    <h2>Member Event Calendar</h2>
                    <div className="member-event-legend">
                        <span className="legend-item engagement">Engagement</span>
                        <span className="legend-item meeting">Meeting</span>
                    </div>
                </div>

                <div className="calendar-wrapper">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        eventClick={handleEventClick}
                        height="auto"
                    />
                </div>

                {/* ✅ Event Details Modal */}
                {showDetailsModal && selectedEvent && (
                    <div className="overlay">
                        <div className="event-details-dialog">
                            <h3>Event Details</h3>
                            <div className="event-details">
                                <p><strong>Title:</strong> {selectedEvent.title}</p>
                                <p><strong>Date:</strong> {selectedEvent.start}</p>
                                <p><strong>Venue:</strong> {selectedEvent.venue}</p>
                                <p><strong>Description:</strong> {selectedEvent.description}</p>
                            </div>
                            <button className="close-btn" onClick={() => setShowDetailsModal(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
