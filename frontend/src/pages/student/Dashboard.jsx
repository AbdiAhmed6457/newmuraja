import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ChatWindow from '../../components/ChatWindow';
import { toast } from 'sonner';

const StudentDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [profile, setProfile] = useState(null);
    const [myUstazs, setMyUstazs] = useState([]);
    const [selectedUstaz, setSelectedUstaz] = useState(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduleData, setScheduleData] = useState([]);
    const [scheduleUstazName, setScheduleUstazName] = useState('');

    const location = useLocation();

    useEffect(() => {
        fetchTasks();
        fetchAttendance();
        fetchProfile();
        fetchMyUstazs();
    }, []);

    useEffect(() => {
        if (location.state?.openChat && myUstazs.length > 0) {
            // Default to first ustaz if specific one not requested, or handle logic to find specific
            setSelectedUstaz(myUstazs[0]);
        }
    }, [location.state, myUstazs]);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/tasks');
            setTasks(res.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchAttendance = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/attendance');
            setAttendance(res.data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/profile');
            setProfile(res.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const fetchMyUstazs = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/my-ustazs');
            setMyUstazs(res.data);
        } catch (error) {
            console.error('Error fetching ustazs:', error);
        }
    };

    const openScheduleModal = async (ustaz) => {
        setScheduleUstazName(ustaz.name);
        try {
            const res = await axios.get(`http://localhost:3000/api/schedule?ustazId=${ustaz.id}`);
            setScheduleData(res.data);
            setShowScheduleModal(true);
        } catch (error) {
            console.error('Error fetching schedule:', error);
            toast.error('Failed to fetch schedule');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
                    {profile && (
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">{profile.name}</div>
                                <div className="text-xs text-gray-500">{profile.email}</div>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold overflow-hidden">
                                {profile.photoUrl ? (
                                    <img src={profile.photoUrl} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    profile.name.charAt(0)
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* My Ustazs Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">My Ustazs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myUstazs.length === 0 ? (
                            <div className="col-span-full bg-white p-6 rounded-lg shadow text-center text-gray-500">
                                You are not connected to any Ustaz yet. <br />
                                <a href="/find-ustaz" className="text-blue-600 hover:underline">Find an Ustaz</a>
                            </div>
                        ) : (
                            myUstazs.map((ustaz) => (
                                <div key={ustaz.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                                                {ustaz.photoUrl ? (
                                                    <img
                                                        src={ustaz.photoUrl.startsWith('http') ? ustaz.photoUrl : `http://localhost:3000${ustaz.photoUrl}`}
                                                        alt={ustaz.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    ustaz.name.charAt(0)
                                                )}
                                            </div>
                                            {ustaz.lastSeen && (
                                                <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${new Date() - new Date(ustaz.lastSeen) < 5 * 60 * 1000 ? 'bg-green-500' : 'bg-gray-400'
                                                    }`}></div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{ustaz.name}</div>
                                            <div className="text-xs text-gray-500">{ustaz.location || 'Online'}</div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => openScheduleModal(ustaz)}
                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                                            title="View Schedule"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </button>
                                        <button
                                            onClick={() => setSelectedUstaz(ustaz)}
                                            className="relative p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                            {ustaz.unreadCount > 0 && (
                                                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                                    {ustaz.unreadCount}
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Tasks Section */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Tasks</h2>
                        {tasks.length === 0 ? (
                            <p className="text-gray-500">No tasks assigned yet.</p>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {tasks.map((task) => (
                                    <li key={task.id} className="py-4">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                                                <p className="text-sm text-gray-500">{task.description}</p>
                                            </div>
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {task.isCompleted ? 'Completed' : 'Pending'}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Attendance Section */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Attendance</h2>
                        {attendance.length === 0 ? (
                            <p className="text-gray-500">No attendance records found.</p>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {attendance.slice(0, 5).map((record) => (
                                    <li key={record.id} className="py-4 flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{new Date(record.date).toLocaleDateString()}</p>
                                            <p className="text-xs text-gray-500">Marked by: {record.ustaz?.name}</p>
                                        </div>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${record.status === 'PRESENT' ? 'bg-green-100 text-green-800' :
                                                record.status === 'ABSENT' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {record.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {selectedUstaz && (
                <ChatWindow otherUser={selectedUstaz} onClose={() => setSelectedUstaz(null)} />
            )}

            {/* Schedule Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Schedule for {scheduleUstazName}</h2>
                            <button onClick={() => setShowScheduleModal(false)} className="text-gray-500 hover:text-gray-700">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {scheduleData.length === 0 ? (
                                <p className="text-gray-500 text-center">No slots available.</p>
                            ) : (
                                scheduleData.map((slot) => (
                                    <div key={slot.id} className={`p-3 rounded border ${slot.isBooked ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                                        <div className="flex justify-between font-medium">
                                            <span>{slot.day}</span>
                                            <span className={`text-xs px-2 py-1 rounded ${slot.isBooked ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                                                {slot.isBooked ? 'Booked' : 'Available'}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {slot.startTime} - {slot.endTime}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
