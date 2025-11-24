import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const HomePage = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [ustazs, setUstazs] = useState([]);
    const [pendingRequests, setPendingRequests] = useState(new Set());
    const [connectedUstazs, setConnectedUstazs] = useState(new Set());
    const [visibleCount, setVisibleCount] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ustazRes = await axios.get('http://localhost:3000/api/users/public-ustazs');
                setUstazs(ustazRes.data);

                if (user && user.role === 'STUDENT') {
                    const connectionsRes = await axios.get('http://localhost:3000/api/users/my-connections');
                    const pending = new Set();
                    const connected = new Set();
                    connectionsRes.data.forEach(conn => {
                        if (conn.status === 'PENDING') pending.add(conn.ustazId);
                        if (conn.status === 'ACCEPTED') connected.add(conn.ustazId);
                    });
                    setPendingRequests(pending);
                    setConnectedUstazs(connected);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [user]);

    const handleJoinClass = async (ustazId) => {
        if (!user) {
            navigate('/login');
            toast.info('Please login to join a class.');
            return;
        }
        if (user.role !== 'STUDENT') {
            toast.error('Only students can join classes.');
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/users/request-ustaz', { ustazId });
            toast.success('Request sent successfully!');
            setPendingRequests(prev => new Set(prev).add(ustazId));
        } catch (error) {
            if (error.response && error.response.data.error === 'Connection request already exists or processed') {
                toast.info('You have already requested to join this class.');
            } else {
                console.error('Error joining class:', error);
                toast.error('Failed to send request.');
            }
        }
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const isOnline = (lastSeen) => {
        if (!lastSeen) return false;
        const diff = new Date() - new Date(lastSeen);
        return diff < 5 * 60 * 1000; // 5 minutes
    };

    const formatLastSeen = (lastSeen) => {
        if (!lastSeen) return 'Offline';
        const date = new Date(lastSeen);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    const filteredUstazs = ustazs.filter(ustaz =>
        ustaz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ustaz.location && ustaz.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const faqs = [
        { question: "How do I choose an Ustaz?", answer: "Browse our curated list of qualified Ustazs below. You can see their specialties, student feedback, and available schedules to find the perfect match." },
        { question: "Is Ayaturrahman free?", answer: "We offer a free tier for basic tracking. Premium plans unlock one-on-one sessions with expert Ustazs and advanced progress analytics." },
        { question: "Can I track my Hifz progress?", answer: "Absolutely. Our dashboard provides a comprehensive view of your memorization journey, including daily logs and visual progress charts." },
        { question: "What if I miss a class?", answer: "Rescheduling is simple. Use your dashboard to request a new time slot, subject to your Ustaz's availability." }
    ];

    return (
        <div className="bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative h-screen flex flex-col justify-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Quran Study Circle"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/60 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 text-center">
                    <div className="animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl font-serif text-amber-100 mb-6 drop-shadow-lg leading-tight italic">
                            "Read! In the Name of your Lord, Who has created..." (Updated)
                        </h1>
                        <p className="text-emerald-200 text-lg md:text-xl font-light tracking-widest uppercase opacity-80">
                            Surah Al-Alaq 96:1
                        </p>

                        <div className="mt-12">
                            <Link to="/register" className="inline-flex items-center px-8 py-4 rounded-full bg-amber-400 text-emerald-950 text-lg font-bold hover:bg-amber-300 transition-all shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transform hover:-translate-y-1">
                                Start Your Journey
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Curved Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg className="relative block w-full h-16 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
                    </svg>
                </div>
            </div>

            {/* Statistics Bar */}
            <div className="relative z-20 -mt-12 max-w-5xl mx-auto px-4">
                <div className="bg-white/90 backdrop-blur-md rounded-full shadow-2xl py-6 px-12 flex flex-col md:flex-row justify-between items-center gap-8 border border-white/50">
                    <div className="flex items-center space-x-4 group cursor-default">
                        <div className="p-3 bg-emerald-100 rounded-full text-emerald-600 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-gray-900">500+</div>
                            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Students</div>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                    <div className="flex items-center space-x-4 group cursor-default">
                        <div className="p-3 bg-amber-100 rounded-full text-amber-600 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-gray-900">50+</div>
                            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ustazs</div>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                    <div className="flex items-center space-x-4 group cursor-default">
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-gray-900">10k+</div>
                            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pages Revised</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meet Our Ustazs Section */}
            <div className="py-24 bg-gray-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm bg-emerald-100 px-4 py-2 rounded-full">Expert Mentorship</span>
                            <h2 className="text-4xl font-black text-gray-900 mt-6">Meet Our Ustazs</h2>
                        </div>
                        <div className="mt-6 md:mt-0 w-full md:w-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by name or location..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 w-full md:w-64 transition-all"
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredUstazs.slice(0, visibleCount).map((ustaz) => (
                            <div key={ustaz.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                                <div className="h-64 relative overflow-hidden">
                                    {ustaz.photoUrl ? (
                                        <img
                                            src={ustaz.photoUrl.startsWith('http') ? ustaz.photoUrl : `http://localhost:3000${ustaz.photoUrl}`}
                                            alt={ustaz.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-200">
                                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div>
                                            <h4 className="text-white text-xl font-bold">{ustaz.name}</h4>
                                            <p className="text-emerald-200 text-sm flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {ustaz.location || 'Global'}
                                            </p>
                                        </div>
                                        <div className={`w-3 h-3 rounded-full border-2 border-white ${isOnline(ustaz.lastSeen) ? 'bg-green-500' : 'bg-gray-400'}`} title={isOnline(ustaz.lastSeen) ? 'Online' : formatLastSeen(ustaz.lastSeen)}></div>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
                                        {ustaz.bio || "Dedicated Quran teacher committed to helping students achieve their Hifz goals."}
                                    </p>

                                    <div className="flex items-center justify-between mb-6 text-sm">
                                        <div className="flex items-center text-gray-700 font-bold">
                                            <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                            {ustaz.studentCount || 0} Students
                                        </div>
                                        <div className="flex items-center text-gray-700 font-bold">
                                            <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {ustaz.freeSlots || 0} Slots
                                        </div>
                                    </div>

                                    {connectedUstazs.has(ustaz.id) ? (
                                        <button disabled className="w-full py-3 rounded-xl bg-emerald-100 text-emerald-700 font-bold cursor-default flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            Connected
                                        </button>
                                    ) : pendingRequests.has(ustaz.id) ? (
                                        <button disabled className="w-full py-3 rounded-xl bg-amber-100 text-amber-700 font-bold cursor-default flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Request Pending
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleJoinClass(ustaz.id)}
                                            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:transform active:scale-95 flex items-center justify-center"
                                        >
                                            Request to Join
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleCount < filteredUstazs.length && (
                        <div className="mt-16 text-center">
                            <button
                                onClick={() => setVisibleCount(prev => prev + 6)}
                                className="px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                            >
                                Load More Ustazs
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* How It Works */}
            <div className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1597935266326-338258e4e007?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Students reading Quran"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/70 to-emerald-900/40"></div>
                </div>

                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform rotate-180 z-10">
                    <svg className="relative block w-full h-16 md:h-32" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-white">
                    <div className="text-center mb-20">
                        <span className="text-amber-300 font-bold tracking-widest uppercase text-sm bg-amber-400/20 px-4 py-2 rounded-full border border-amber-400/30 backdrop-blur-sm">Simple Process</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-6 mb-6 drop-shadow-lg">Your Path to Mastery</h2>
                        <p className="text-xl text-emerald-100 max-w-2xl mx-auto font-light leading-relaxed">Three simple steps to start your journey of memorization.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-emerald-800/50 -translate-y-1/2 z-0 border-t border-dashed border-emerald-400/30"></div>

                        {[
                            { step: 1, title: "Create Profile", desc: "Sign up and tell us about your current Hifz level and goals.", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                            { step: 2, title: "Connect with Ustaz", desc: "Find a mentor who fits your schedule and learning style.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
                            { step: 3, title: "Start Revising", desc: "Attend live sessions, track progress, and achieve your milestones.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }
                        ].map((item) => (
                            <div key={item.step} className="relative z-10 text-center group">
                                <div className="w-24 h-24 mx-auto bg-emerald-800/80 backdrop-blur-md rounded-full flex items-center justify-center text-amber-300 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl border-4 border-emerald-700/50">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-4 drop-shadow-md">{item.title}</h4>
                                <p className="text-emerald-100 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg className="relative block w-full h-16 md:h-32" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
                    </svg>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm bg-emerald-100 px-4 py-2 rounded-full">Got Questions?</span>
                        <h2 className="text-4xl font-black text-gray-900 mt-6 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-500 text-lg">Everything you need to know about the platform.</p>
                    </div>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className={`bg-white rounded-2xl shadow-sm overflow-hidden border transition-all duration-300 ${openFaq === index ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : 'border-gray-100 hover:border-emerald-200'}`}>
                                <button
                                    className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className={`text-lg font-bold transition-colors ${openFaq === index ? 'text-emerald-700' : 'text-gray-900'}`}>{faq.question}</span>
                                    <span className={`transform transition-transform duration-300 bg-gray-50 rounded-full p-2 ${openFaq === index ? 'rotate-180 text-emerald-600 bg-emerald-50' : 'text-gray-400'}`}>
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                                        <div className="h-px w-full bg-gray-50 mb-4"></div>
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
