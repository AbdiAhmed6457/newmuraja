import { useState, useEffect } from 'react';
import axios from 'axios';

const StudentSchedule = () => {
    const [myUstazs, setMyUstazs] = useState([]);
    const [selectedUstaz, setSelectedUstaz] = useState(null);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        fetchMyUstazs();
    }, []);

    const fetchMyUstazs = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/my-ustazs');
            setMyUstazs(res.data);
            if (res.data.length > 0) {
                setSelectedUstaz(res.data[0]);
                fetchSchedule(res.data[0].id);
            }
        } catch (error) {
            console.error('Error fetching ustazs:', error);
        }
    };

    const fetchSchedule = async (ustazId) => {
        try {
            const res = await axios.get(`http://localhost:3000/api/schedule?ustazId=${ustazId}`);
            setSchedule(res.data);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    };

    const handleUstazChange = (ustaz) => {
        setSelectedUstaz(ustaz);
        fetchSchedule(ustaz.id);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Class Schedule</h2>

            {myUstazs.length > 0 ? (
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Ustaz</label>
                        <div className="flex space-x-4 overflow-x-auto pb-2">
                            {myUstazs.map((ustaz) => (
                                <button
                                    key={ustaz.id}
                                    onClick={() => handleUstazChange(ustaz)}
                                    className={`flex items-center px-4 py-2 rounded-full border transition-colors ${selectedUstaz?.id === ustaz.id ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden mr-2">
                                        {ustaz.photoUrl ? (
                                            <img src={ustaz.photoUrl} alt="" className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-xs font-bold">{ustaz.name[0]}</div>
                                        )}
                                    </div>
                                    {ustaz.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {schedule.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500 py-8">No schedule slots available for this Ustaz.</div>
                        ) : (
                            schedule.map((slot) => (
                                <div key={slot.id} className={`p-4 rounded-lg border ${slot.isBooked ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-gray-900">{slot.day}</span>
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${slot.isBooked ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                                            {slot.isBooked ? 'Booked' : 'Available'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {slot.startTime} - {slot.endTime}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500 py-12 bg-white rounded-lg shadow">
                    You are not connected to any Ustaz yet. <br />
                    <a href="/find-ustaz" className="text-emerald-600 font-semibold hover:underline mt-2 inline-block">Find an Ustaz</a>
                </div>
            )}
        </div>
    );
};

export default StudentSchedule;
