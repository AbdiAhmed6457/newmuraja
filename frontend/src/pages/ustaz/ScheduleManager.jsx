import { useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleManager = () => {
    const [slots, setSlots] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newSlot, setNewSlot] = useState({ day: 'Monday', startTime: '', endTime: '' });

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/schedule');
            setSlots(res.data);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const addSlot = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/schedule', newSlot);
            alert('Slot added successfully!');
            setShowModal(false);
            fetchSlots();
        } catch (error) {
            console.error('Error adding slot:', error);
            alert('Failed to add slot.');
        }
    };

    const deleteSlot = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`http://localhost:3000/api/schedule/${id}`);
            fetchSlots();
        } catch (error) {
            console.error('Error deleting slot:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Manage Schedule</h1>
                    <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Time Slot</button>
                </div>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    {slots.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">No time slots created yet.</div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {slots.map((slot) => (
                                    <tr key={slot.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slot.day}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{slot.startTime} - {slot.endTime}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${slot.isBooked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                {slot.isBooked ? 'Booked' : 'Available'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => deleteSlot(slot.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                        <h2 className="text-lg font-bold mb-4">Add Time Slot</h2>
                        <form onSubmit={addSlot}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Day</label>
                                <select
                                    value={newSlot.day}
                                    onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                >
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                                <input
                                    type="time"
                                    required
                                    value={newSlot.startTime}
                                    onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">End Time</label>
                                <input
                                    type="time"
                                    required
                                    value={newSlot.endTime}
                                    onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleManager;
