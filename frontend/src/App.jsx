import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Profile from './pages/Profile';
import StudentDashboard from './pages/student/Dashboard';
import FindUstaz from './pages/student/FindUstaz';
import UstazDashboard from './pages/ustaz/Dashboard';
import MyStudents from './pages/ustaz/MyStudents';
import ScheduleManager from './pages/ustaz/ScheduleManager';
import AdminDashboard from './pages/admin/Dashboard';

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

            <Route path="/student" element={<PrivateRoute roles={['STUDENT']}><StudentDashboard /></PrivateRoute>} />
            <Route path="/find-ustaz" element={<PrivateRoute roles={['STUDENT']}><FindUstaz /></PrivateRoute>} />

            <Route path="/ustaz" element={<PrivateRoute roles={['USTAZ']}><UstazDashboard /></PrivateRoute>} />
            <Route path="/ustaz/students" element={<PrivateRoute roles={['USTAZ']}><MyStudents /></PrivateRoute>} />
            <Route path="/ustaz/schedule" element={<PrivateRoute roles={['USTAZ']}><ScheduleManager /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute roles={['ADMIN']}><AdminDashboard /></PrivateRoute>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
