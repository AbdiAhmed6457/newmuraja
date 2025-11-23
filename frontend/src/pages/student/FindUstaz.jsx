import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
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
            const res = await axios.get('http://localhost:3000/api/users/ustaz');
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

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <Toaster position="top-center" richColors />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Find an Ustaz</h1>

                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search by name or location..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredUstazs.map((ustaz) => {
                        const status = getConnectionStatus(ustaz.id);
                        return (
                            <div key={ustaz.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl overflow-hidden">
                                            {ustaz.photoUrl ? <img src={ustaz.photoUrl.startsWith('http') ? ustaz.photoUrl : `http://localhost:3000${ustaz.photoUrl}`} alt={ustaz.name} className="h-full w-full object-cover" /> : ustaz.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900">{ustaz.name}</h3>
                                            <p className="text-sm text-gray-500">{ustaz.location || 'Location not specified'}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600 line-clamp-3">{ustaz.bio || 'No bio available.'}</p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {ustaz.educationLevel || 'General'}
                                        </span>
                                        {status === 'ACCEPTED' ? (
                                            <span className="text-green-600 font-medium text-sm flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                Connected
                                            </span>
                                        ) : status === 'PENDING' ? (
                                            <span className="text-yellow-600 font-medium text-sm flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                Pending
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => requestToJoin(ustaz.id)}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                Request to Join
                                            </button>
                                        )}
                                    </div>
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
