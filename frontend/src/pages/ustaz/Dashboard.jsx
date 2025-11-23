import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UstazDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalStudents: 0,
        pendingTasks: 0,
        upcomingClasses: 0
    });
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchStats();
        fetchRequests();
    }, []);

    const fetchStats = async () => {
        // Placeholder for fetching real stats
        setStats({
            totalStudents: 12,
            pendingTasks: 5,
            upcomingClasses: 3
        });
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/pending-requests');
            setRequests(res.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleRequest = async (connectionId, status) => {
        try {
            await axios.put('http://localhost:3000/api/users/handle-request', { connectionId, status });
            fetchRequests(); // Refresh list
            alert(`Request ${status.toLowerCase()} successfully.`);
        } catch (error) {
            console.error('Error handling request:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Ustaz Dashboard</h1>
                        <p className="mt-2 text-gray-600">Welcome back, Ustaz {user.name}</p>
                    </div>
                    <div className="space-x-4">
                        <Link to="/ustaz/students" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">My Students</Link>
                        <Link to="/ustaz/schedule" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Manage Schedule</Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalStudents}</dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Pending Tasks</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.pendingTasks}</dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Classes</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.upcomingClasses}</dd>
                        </div>
                    </div>
                </div>

                {/* Pending Requests */}
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Requests</h2>
                    {requests.length === 0 ? (
                        <p className="text-gray-500">No pending requests.</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {requests.map((req) => (
                                <li key={req.id} className="py-4 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                            {req.name.charAt(0)}
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">{req.name}</p>
                                            <p className="text-sm text-gray-500">Wants to join your class</p>
                                        </div>
                                    </div>
                                    <div className="space-x-2">
                                        <button onClick={() => handleRequest(req.connectionId, 'ACCEPTED')} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200">Accept</button>
                                        <button onClick={() => handleRequest(req.connectionId, 'REJECTED')} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200">Reject</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
};

export default UstazDashboard;
