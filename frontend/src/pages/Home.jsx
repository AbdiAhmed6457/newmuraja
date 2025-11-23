import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import Footer from '../components/Footer';

const Home = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [ustazs, setUstazs] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUstazs = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/users/public-ustazs');
                setUstazs(res.data);
            } catch (error) {
                console.error('Error fetching ustazs:', error);
            }
        };
        fetchUstazs();
    }, []);

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
            toast.success('Request sent successfully! Check your dashboard for updates.');
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

    const faqs = [
        { question: "How do I choose an Ustaz?", answer: "Browse our curated list of qualified Ustazs below. You can see their specialties, student feedback, and available schedules to find the perfect match." },
        { question: "Is Ayaturrahman free?", answer: "We offer a free tier for basic tracking. Premium plans unlock one-on-one sessions with expert Ustazs and advanced progress analytics." },
        { question: "Can I track my Hifz progress?", answer: "Absolutely. Our dashboard provides a comprehensive view of your memorization journey, including daily logs and visual progress charts." },
        { question: "What if I miss a class?", answer: "Rescheduling is simple. Use your dashboard to request a new time slot, subject to your Ustaz's availability." }
    ];

    const isOnline = (lastSeen) => {
        if (!lastSeen) return false;
        const diff = new Date() - new Date(lastSeen);
        return diff < 5 * 60 * 1000; // 5 minutes
    };

    const formatLastSeen = (lastSeen) => {
        if (!lastSeen) return 'Offline';
        const date = new Date(lastSeen);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000); // seconds

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="bg-gray-50 font-sans text-gray-900">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1596529846208-41d55648589f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Quran Study"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/90 via-emerald-900/70 to-emerald-900/90"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-amber-400/20 text-amber-300 text-sm font-semibold tracking-wider mb-6 border border-amber-400/30 backdrop-blur-sm">
                        #1 QURAN LEARNING PLATFORM
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 drop-shadow-2xl leading-tight">
                        Master the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Holy Quran</span>
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto font-light leading-relaxed">
                        Connect with expert mentors, track your Hifz journey, and illuminate your heart with the divine words.
                    </p>
                    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                        <Link to="/register" className="px-8 py-4 rounded-full bg-amber-400 text-emerald-900 text-lg font-bold hover:bg-amber-300 transition-all shadow-[0_0_20px_rgba(251,191,36,0.4)] transform hover:-translate-y-1">
                            Start Your Journey
                        </Link>
                        <Link to="/about" className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-bold hover:bg-white/20 transition-all">
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="relative z-20 -mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <div className="text-4xl font-black text-gray-900">500+</div>
                        <div className="mt-2 text-gray-500 font-medium">Active Students</div>
                    </div>
                    <div className="text-center pt-8 md:pt-0">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <div className="text-4xl font-black text-gray-900">50+</div>
                        <div className="mt-2 text-gray-500 font-medium">Qualified Ustazs</div>
                    </div>
                    <div className="text-center pt-8 md:pt-0">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <div className="text-4xl font-black text-gray-900">10k+</div>
                        <div className="mt-2 text-gray-500 font-medium">Pages Revised</div>
                    </div>
                </div>
            </div>

            {/* Meet Our Ustazs Section */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-emerald-600 font-bold tracking-wide uppercase text-sm mb-2">Expert Mentorship</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Meet Our Ustazs</h3>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Connect with qualified teachers who are dedicated to guiding you on your spiritual journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ustazs.length > 0 ? (
                            ustazs.map((ustaz) => (
                                <div key={ustaz.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                                    <div className="h-64 relative overflow-hidden">
                                        {ustaz.photoUrl ? (
                                            <img
                                                src={ustaz.photoUrl.startsWith('http') ? ustaz.photoUrl : `http://localhost:3000${ustaz.photoUrl}`}
                                                alt={ustaz.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-200">
                                                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h4 className="text-white text-2xl font-bold mb-1">{ustaz.name}</h4>
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2.5 h-2.5 rounded-full ${isOnline(ustaz.lastSeen) ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                                <span className="text-gray-300 text-sm font-medium">
                                                    {isOnline(ustaz.lastSeen) ? 'Online' : `Last seen ${formatLastSeen(ustaz.lastSeen)}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center text-sm text-gray-500 mb-4">
                                            <svg className="w-4 h-4 mr-1 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            {ustaz.location || 'Online'}
                                        </div>
                                        <p className="text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed">
                                            {ustaz.bio || "Dedicated Quran teacher committed to helping students achieve their Hifz goals with patience and expertise."}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-6">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-gray-900">{ustaz.studentCount || 0}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide">Students</div>
                                            </div>
                                            <div className="w-px h-8 bg-gray-200"></div>
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-gray-900">{ustaz.freeSlots || 0}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide">Slots</div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleJoinClass(ustaz.id)}
                                            className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:transform active:scale-95"
                                        >
                                            Request to Join
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
                                <p className="text-gray-500 text-lg">No Ustazs available at the moment. Please check back soon.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabesque.png")' }}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-emerald-600 font-bold tracking-wide uppercase text-sm mb-2">Simple Process</h2>
                        <h3 className="text-4xl font-black text-gray-900">Your Path to Mastery</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: 1, title: "Create Profile", desc: "Sign up and tell us about your current Hifz level and goals.", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                            { step: 2, title: "Connect with Ustaz", desc: "Find a mentor who fits your schedule and learning style.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
                            { step: 3, title: "Start Revising", desc: "Attend live sessions, track progress, and achieve your milestones.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }
                        ].map((item) => (
                            <div key={item.step} className="text-center group p-8 rounded-3xl hover:bg-emerald-50 transition-colors duration-300">
                                <div className="w-24 h-24 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h4>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-black text-center text-gray-900 mb-12">Common Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                <button
                                    className="flex justify-between items-center w-full p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                                    <span className={`transform transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`}>
                                        <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-4">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
