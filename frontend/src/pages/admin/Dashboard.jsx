import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p>Welcome, {user.name}</p>
            <button onClick={logout} className="px-4 py-2 mt-4 text-white bg-red-500 rounded">Logout</button>
        </div>
    );
};

export default AdminDashboard;
