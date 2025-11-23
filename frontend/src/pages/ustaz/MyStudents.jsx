import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatWindow from '../../components/ChatWindow';

const MyStudents = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [attendanceData, setAttendanceData] = useState({ status: 'PRESENT', remarks: '' });
    const [attendanceStudent, setAttendanceStudent] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskData, setTaskData] = useState({ title: '', description: '' });
    const [taskStudent, setTaskStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/my-students');
            setStudents(res.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const openAttendanceModal = (student) => {
        setAttendanceStudent(student);
        setAttendanceData({ status: 'PRESENT', remarks: '' });
        setShowAttendanceModal(true);
    };

    const submitAttendance = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/attendance', {
                studentId: attendanceStudent.id,
                ...attendanceData
            });
            alert('Attendance marked successfully!');
            setShowAttendanceModal(false);
        } catch (error) {
            console.error('Error marking attendance:', error);
            alert('Failed to mark attendance.');
        }
    };

    const openTaskModal = (student) => {
        setTaskStudent(student);
        setTaskData({ title: '', description: '' });
        setShowTaskModal(true);
    };

    const submitTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/tasks', {
                studentId: taskStudent.id,
                ...taskData
            });
            alert('Task assigned successfully!');
            setShowTaskModal(false);
        } catch (error) {
            console.error('Error assigning task:', error);
            alert('Failed to assign task.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Students</h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    {students.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">No students assigned yet.</div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {students.map((student) => (
                                <li key={student.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold overflow-hidden relative">
                                                {student.photoUrl ? (
                                                    <img
                                                        src={student.photoUrl.startsWith('http') ? student.photoUrl : `http://localhost:3000${student.photoUrl}`}
                                                        alt={student.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    student.name.charAt(0)
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-blue-600 truncate">{student.name}</div>
                                                <div className="text-sm text-gray-500">{student.email}</div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 items-center">
                                            <button
                                                onClick={() => setSelectedStudent(student)}
                                                className="relative px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center"
                                            >
                                                Message
                                                {student.unreadCount > 0 && (
                                                    <span className="ml-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                                        {student.unreadCount}
                                                    </span>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => openAttendanceModal(student)}
                                                className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                            >
                                                Attendance
                                            </button>
                                            <button
                                                onClick={() => openTaskModal(student)}
                                                className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                                            >
                                                Assign Task
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {selectedStudent && (
                <ChatWindow otherUser={selectedStudent} onClose={() => setSelectedStudent(null)} />
            )}

            {/* Attendance Modal */}
            {showAttendanceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                        <h2 className="text-lg font-bold mb-4">Mark Attendance for {attendanceStudent?.name}</h2>
                        <form onSubmit={submitAttendance}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    value={attendanceData.status}
                                    onChange={(e) => setAttendanceData({ ...attendanceData, status: e.target.value })}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                                >
                                    <option value="PRESENT">Present</option>
                                    <option value="ABSENT">Absent</option>
                                    <option value="LATE">Late</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Remarks (Optional)</label>
                                <textarea
                                    value={attendanceData.remarks}
                                    onChange={(e) => setAttendanceData({ ...attendanceData, remarks: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAttendanceModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Task Modal */}
            {showTaskModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                        <h2 className="text-lg font-bold mb-4">Assign Task to {taskStudent?.name}</h2>
                        <form onSubmit={submitTask}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={taskData.title}
                                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    required
                                    value={taskData.description}
                                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowTaskModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Assign
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyStudents;
