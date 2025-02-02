import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EnrollMember from "./components/EnrollMember";
import EditMember from "./components/EditMember"; // Import the EditMember component
import MemberHome from "./pages/MemberHome"; // Import the MemberHome component
import Attendance from "./components/Attendance";
import UpdateAttendance from "./components/UpdateAttendance";
import AdminCalendar from "./components/AdminCalendar";
import MemberCalendar from "./components/MemberCalendar";


function App() {
    return (
        <Routes>
            {/* Default Route to Login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Actual Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/enroll" element={<EnrollMember />} />
            <Route path="/edit/:id" element={<EditMember />} /> 
            <Route path="/member-home" element={<MemberHome />} /> 
            <Route path="/attendance" element={<Attendance />} /> 
            <Route path="/update-attendance" element={<UpdateAttendance />} />
            <Route path="/calendar-admin" element={<AdminCalendar />} />
            <Route path="/event-calendar" element={<MemberCalendar />} />


        </Routes>
    );
}

export default App;
