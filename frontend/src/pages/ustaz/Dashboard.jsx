import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

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
        // Placeholder for fetching real stats - in a real app, this would be an API call
        // For now, we'll simulate some data or fetch what we can
        try {
            // Example: Fetch student count if we had an endpoint
            // const res = await axios.get('http://localhost:3000/api/users/my-students-count');
            setStats({
                totalStudents: 12, // Mock data
                pendingTasks: 5,   // Mock data
                upcomingClasses: 3 // Mock data
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/pending-requests');
            setRequests(res.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
            toast.error('Failed to fetch pending requests');
        }
    };

    const handleRequest = async (connectionId, status) => {
        try {
            await axios.put('http://localhost:3000/api/users/handle-request', { connectionId, status });
            fetchRequests(); // Refresh list
            toast.success(`Request ${status.toLowerCase()} successfully.`);
        } catch (error) {
            console.error('Error handling request:', error);
            toast.error('Failed to process request');
        }
    };

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, Ustaz {user.name}</h1>
                    <p className="text-emerald-100 max-w-2xl">
                        May your day be filled with barakah. You have <span className="font-bold text-white">{requests.length} new requests</span> and <span className="font-bold text-white">{stats.upcomingClasses} upcoming classes</span> today.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <span className="text-sm font-medium text-gray-400">Total Students</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{stats.totalStudents}</div>
                    <div className="mt-2 text-sm text-emerald-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        <span>+2 this week</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                        </div>
                        <span className="text-sm font-medium text-gray-400">Pending Tasks</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{stats.pendingTasks}</div>
                    <div className="mt-2 text-sm text-gray-500">Assignments to review</div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <span className="text-sm font-medium text-gray-400">Upcoming Classes</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{stats.upcomingClasses}</div>
                    <div className="mt-2 text-sm text-blue-600">Next class in 2 hours</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pending Requests */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">Connection Requests</h2>
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">{requests.length} New</span>
                    </div>
                    <div className="p-6">
                        {requests.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                                </div>
                                <p className="text-gray-500">No pending requests at the moment.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {requests.map((req) => (
                                    <div key={req.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-12 w-12 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xl">
                                                {req.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{req.name}</h3>
                                                <p className="text-sm text-gray-500">Wants to join your class</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleRequest(req.connectionId, 'ACCEPTED')}
                                                className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                                                title="Accept"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            </button>
                                            <button
                                                onClick={() => handleRequest(req.connectionId, 'REJECTED')}
                                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                title="Reject"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <Link to="/ustaz/students" className="flex flex-col items-center justify-center p-6 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors group">
                            <div className="w-12 h-12 bg-emerald-200 text-emerald-700 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                            <span className="font-bold text-gray-900">Manage Students</span>
                        </Link>
                        <Link to="/ustaz/schedule" className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
                            <div className="w-12 h-12 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <span className="font-bold text-gray-900">Update Schedule</span>
                        </Link>
                        <Link to="/profile" className="flex flex-col items-center justify-center p-6 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors group">
                            <div className="w-12 h-12 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <span className="font-bold text-gray-900">Edit Profile</span>
                        </Link>
                        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-not-allowed opacity-60">
                            <div className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            </div>
                            <span className="font-bold text-gray-900">Analytics (Soon)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UstazDashboard;
