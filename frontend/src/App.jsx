import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/student/Dashboard';
import StudentTasks from './pages/student/StudentTasks';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentSchedule from './pages/student/StudentSchedule';
import UstazDashboard from './pages/ustaz/Dashboard';
import MyStudents from './pages/ustaz/MyStudents';
import ScheduleManager from './pages/ustaz/ScheduleManager';
import AdminDashboard from './pages/admin/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import FindUstaz from './pages/student/FindUstaz';
import Profile from './pages/Profile';
import Services from './pages/Services';
import About from './pages/About';
import StudentLayout from './layouts/StudentLayout';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />

          {/* Student Routes */}
          <Route path="/student" element={<PrivateRoute role="STUDENT"><StudentLayout /></PrivateRoute>}>
            <Route index element={<StudentDashboard />} />
            <Route path="tasks" element={<StudentTasks />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="schedule" element={<StudentSchedule />} />
          </Route>
          <Route path="/find-ustaz" element={<PrivateRoute role="STUDENT"><FindUstaz /></PrivateRoute>} />

          {/* Ustaz Routes */}
          <Route path="/ustaz" element={<PrivateRoute role="USTAZ"><UstazDashboard /></PrivateRoute>} />
          <Route path="/ustaz/students" element={<PrivateRoute role="USTAZ"><MyStudents /></PrivateRoute>} />
          <Route path="/ustaz/schedule" element={<PrivateRoute role="USTAZ"><ScheduleManager /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<PrivateRoute role="ADMIN"><AdminDashboard /></PrivateRoute>} />

          {/* Shared Routes */}
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
