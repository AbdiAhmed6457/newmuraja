import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import ChatWindow from '../../components/ChatWindow';

const StudentDashboard = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [tasks, setTasks] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [complaint, setComplaint] = useState('');
    const [myUstazs, setMyUstazs] = useState([]);
    const [selectedUstaz, setSelectedUstaz] = useState(null);

    useEffect(() => {
        fetchTasks();
        fetchAttendance();
        fetchMyUstazs();
    }, []);

    useEffect(() => {
        if (location.state?.openChat && myUstazs.length > 0) {
            // Default to the first ustaz if chat is requested via navbar, 
            // or we could show a list to pick from. For now, let's pick the first one.
            setSelectedUstaz(myUstazs[0]);
        }
    }, [location.state, myUstazs]);

    const fetchMyUstazs = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/my-ustazs');
            setMyUstazs(res.data);
        } catch (error) {
            console.error('Error fetching ustazs:', error);
        }
    };

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

    const submitFeedback = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/student/feedback', { content: feedback });
            alert('Feedback submitted!');
            setFeedback('');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const submitComplaint = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/student/complaint', { content: complaint });
            alert('Complaint submitted!');
            setComplaint('');
        } catch (error) {
            console.error('Error submitting complaint:', error);
        }
    };

    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduleSlots, setScheduleSlots] = useState([]);
    const [scheduleUstaz, setScheduleUstaz] = useState(null);

    const openScheduleModal = async (ustaz) => {
        setScheduleUstaz(ustaz);
        try {
            const res = await axios.get(`http://localhost:3000/api/schedule?ustazId=${ustaz.id}`);
            setScheduleSlots(res.data);
            setShowScheduleModal(true);
        } catch (error) {
            console.error('Error fetching schedule:', error);
            alert('Failed to fetch schedule.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <main className="py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
                    <Link to="/find-ustaz" className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        Find New Ustaz
                    </Link>
                </div>

                {/* My Ustazs Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">My Ustazs</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {myUstazs.map(ustaz => (
                            <div key={ustaz.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="relative">
                                        <img
                                            src={ustaz.photoUrl ? (ustaz.photoUrl.startsWith('http') ? ustaz.photoUrl : `http://localhost:3000${ustaz.photoUrl}`) : "https://via.placeholder.com/40"}
                                            alt={ustaz.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="font-medium text-gray-900">{ustaz.name}</h3>
                                        <p className="text-xs text-gray-500">{ustaz.educationLevel}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => openScheduleModal(ustaz)}
                                        className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                                        title="View Schedule"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => setSelectedUstaz(ustaz)}
                                        className="relative p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                                        title="Chat"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                        {ustaz.unreadCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                                {ustaz.unreadCount}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                        {myUstazs.length === 0 && (
                            <div className="col-span-full text-center py-8 bg-white rounded-lg border border-dashed border-gray-300">
                                <p className="text-gray-500">You haven't connected with any Ustaz yet.</p>
                                <Link to="/find-ustaz" className="text-green-600 font-medium hover:underline mt-2 inline-block">Find one now</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Tasks Completed</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{tasks.filter(t => t.isCompleted).length}</dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Attendance Rate</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                {attendance.length > 0
                                    ? Math.round((attendance.filter(a => a.status === 'PRESENT').length / attendance.length) * 100)
                                    : 0}%
                            </dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Current Streak</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">5 Days</dd>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Tasks Section */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">My Tasks</h2>
                        <ul className="divide-y divide-gray-200">
                            {tasks.map((task) => (
                                <li key={task.id} className="py-4">
                                    <div className="flex items-center justify-between">
                                        <p className={`text-sm font-medium ${task.isCompleted ? 'text-green-600 line-through' : 'text-gray-900'}`}>
                                            {task.title}
                                        </p>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {task.isCompleted ? 'Done' : 'Pending'}
                                        </span>
                                    </div>
                                </li>
                            ))}
                            {tasks.length === 0 && <p className="text-gray-500 text-sm">No tasks assigned.</p>}
                        </ul>
                    </div>

                    {/* Attendance Section */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Attendance</h2>
                        <ul className="divide-y divide-gray-200">
                            {attendance.slice(0, 5).map((record) => (
                                <li key={record.id} className="py-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{new Date(record.date).toLocaleDateString()}</p>
                                            <p className="text-xs text-gray-500">Marked by: {record.ustaz?.name || 'Unknown'}</p>
                                        </div>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'PRESENT' ? 'bg-green-100 text-green-800' :
                                            record.status === 'ABSENT' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </div>
                                </li>
                            ))}
                            {attendance.length === 0 && <p className="text-gray-500 text-sm">No attendance records.</p>}
                        </ul>
                    </div>
                </div>

                {/* Feedback & Complaints */}
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Submit Feedback</h2>
                        <form onSubmit={submitFeedback}>
                            <textarea
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                                rows="3"
                                placeholder="Share your thoughts..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            ></textarea>
                            <button type="submit" className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                                Submit
                            </button>
                        </form>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Report an Issue</h2>
                        <form onSubmit={submitComplaint}>
                            <textarea
                                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
                                rows="3"
                                placeholder="Describe the issue..."
                                value={complaint}
                                onChange={(e) => setComplaint(e.target.value)}
                            ></textarea>
                            <button type="submit" className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                                Report
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            {selectedUstaz && (
                <ChatWindow otherUser={selectedUstaz} onClose={() => setSelectedUstaz(null)} />
            )}

            {/* Schedule Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-xl max-h-[80vh] overflow-y-auto">
                        <h2 className="text-lg font-bold mb-4">Schedule for {scheduleUstaz?.name}</h2>
                        {scheduleSlots.length === 0 ? (
                            <p className="text-gray-500">No available slots.</p>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {scheduleSlots.map(slot => (
                                    <li key={slot.id} className="py-3 flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{slot.day}</p>
                                            <p className="text-xs text-gray-500">{slot.startTime} - {slot.endTime}</p>
                                        </div>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${slot.isBooked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {slot.isBooked ? 'Booked' : 'Available'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setShowScheduleModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
