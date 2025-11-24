import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';

const FindUstaz = () => {
    const { user } = useAuth();
    const [ustazs, setUstazs] = useState([]);
    const [connections, setConnections] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUstazs();
        fetchConnections();
    }, []);

    const fetchUstazs = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/public-ustazs'); // Use public-ustazs to get more info like student count
            setUstazs(res.data);
        } catch (error) {
            console.error('Error fetching ustazs:', error);
        }
    };

    const fetchConnections = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/my-connections');
            setConnections(res.data);
        } catch (error) {
            console.error('Error fetching connections:', error);
        }
    };

    const requestToJoin = async (ustazId) => {
        try {
            await axios.post('http://localhost:3000/api/users/request-ustaz', { ustazId });
            toast.success('Request sent successfully! Waiting for approval.');
            fetchConnections(); // Refresh status
        } catch (error) {
            console.error('Error requesting ustaz:', error);
            toast.error(error.response?.data?.error || 'Failed to send request.');
        }
    };

    const getConnectionStatus = (ustazId) => {
        const connection = connections.find(c => c.ustazId === ustazId);
        return connection ? connection.status : null;
    };

    const filteredUstazs = ustazs.filter(ustaz =>
        ustaz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ustaz.location && ustaz.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const isOnline = (lastSeen) => {
        if (!lastSeen) return false;
        const diff = new Date() - new Date(lastSeen);
        return diff < 5 * 60 * 1000; // 5 minutes
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">Find an Ustaz</h1>
                        <p className="text-gray-500 mt-2">Connect with expert mentors to guide your journey.</p>
                    </div>
                    <div className="mt-6 md:mt-0 w-full md:w-auto relative">
                        <input
                            type="text"
                            placeholder="Search by name or location..."
                            className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 w-full md:w-80 transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredUstazs.map((ustaz) => {
                        const status = getConnectionStatus(ustaz.id);
                        return (
                            <div key={ustaz.id} className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                                <div className="h-48 relative overflow-hidden">
                                    {ustaz.photoUrl ? (
                                        <img
                                            src={ustaz.photoUrl.startsWith('http') ? ustaz.photoUrl : `http://localhost:3000${ustaz.photoUrl}`}
                                            alt={ustaz.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-200">
                                            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div>
                                            <h3 className="text-white text-lg font-bold">{ustaz.name}</h3>
                                            <p className="text-emerald-100 text-xs flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {ustaz.location || 'Global'}
                                            </p>
                                        </div>
                                        {isOnline(ustaz.lastSeen) && (
                                            <div className="flex items-center bg-green-500/20 backdrop-blur-md px-2 py-1 rounded-full border border-green-500/30">
                                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-1"></div>
                                                <span className="text-green-100 text-[10px] font-bold uppercase tracking-wider">Online</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed flex-1">
                                        {ustaz.bio || "Dedicated Quran teacher committed to helping students achieve their Hifz goals."}
                                    </p>

                                    <div className="flex items-center justify-between mb-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                            {ustaz.studentCount || 0} Students
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {ustaz.freeSlots || 0} Slots
                                        </div>
                                    </div>

                                    {status === 'ACCEPTED' ? (
                                        <button disabled className="w-full py-3 rounded-xl bg-emerald-100 text-emerald-700 font-bold cursor-default flex items-center justify-center transition-colors">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            Connected
                                        </button>
                                    ) : status === 'PENDING' ? (
                                        <button disabled className="w-full py-3 rounded-xl bg-amber-100 text-amber-700 font-bold cursor-default flex items-center justify-center transition-colors">
                                            <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Request Pending
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => requestToJoin(ustaz.id)}
                                            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:transform active:scale-95 flex items-center justify-center"
                                        >
                                            Request to Join
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FindUstaz;
