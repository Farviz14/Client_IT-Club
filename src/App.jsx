import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EnrollMember from "./components/EnrollMember";
import EditMember from "./components/EditMember"; // Import the EditMember component
import MemberHome from "./pages/MemberHome"; // Import the MemberHome component
import Attendance from "./components/Attendance";
import UpdateAttendance from "./components/UpdateAttendance";


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
            <Route path="/edit/:id" element={<EditMember />} /> {/* Edit Route Added */}
            <Route path="/member-home" element={<MemberHome />} /> {/* Member Home Route */}
            <Route path="/attendance" element={<Attendance />} /> {/* Member Home Route */}
            <Route path="/update-attendance" element={<UpdateAttendance />} />


        </Routes>
    );
}

export default App;
