import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

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
        <div className="bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        className="w-full h-full object-cover transform scale-105"
                        src="https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Quran Study Circle"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/80 to-emerald-900/40"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-2/3 text-left">
                        <div className="inline-flex items-center space-x-2 py-1 px-3 rounded-full bg-amber-400/20 text-amber-300 text-sm font-bold tracking-wider mb-8 border border-amber-400/30 backdrop-blur-sm animate-fade-in-up">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                            <span>#1 QURAN LEARNING PLATFORM</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 drop-shadow-2xl leading-tight animate-fade-in-up delay-100">
                            Illuminating Hearts <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Together</span>
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl text-emerald-100 max-w-2xl font-light leading-relaxed animate-fade-in-up delay-200">
                            Join our global circle of knowledge. Connect with expert mentors, recite with peers, and master the Holy Quran in a spiritually uplifting environment.
                        </p>
                        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in-up delay-300">
                            <Link to="/register" className="px-10 py-5 rounded-2xl bg-amber-400 text-emerald-950 text-lg font-bold hover:bg-amber-300 transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transform hover:-translate-y-1 flex items-center justify-center">
                                Start Your Journey
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                            </Link>
                            <Link to="/about" className="px-10 py-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 text-white text-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center group">
                                Learn More
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Curved Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg className="relative block w-full h-24 md:h-48" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
                    </svg>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="relative z-20 -mt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100 transform hover:-translate-y-2 transition-transform duration-500">
                    <div className="text-center group">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <div className="text-5xl font-black text-gray-900 mb-2">500+</div>
                        <div className="text-gray-500 font-medium uppercase tracking-wider text-sm">Active Students</div>
                    </div>
                    <div className="text-center pt-8 md:pt-0 group">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <div className="text-5xl font-black text-gray-900 mb-2">50+</div>
                        <div className="text-gray-500 font-medium uppercase tracking-wider text-sm">Qualified Ustazs</div>
                    </div>
                    <div className="text-center pt-8 md:pt-0 group">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <div className="text-5xl font-black text-gray-900 mb-2">10k+</div>
                        <div className="text-gray-500 font-medium uppercase tracking-wider text-sm">Pages Revised</div>
                    </div>
                </div>
            </div>

            {/* Meet Our Ustazs Section */}
            <div className="py-24 bg-gray-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm bg-emerald-100 px-4 py-2 rounded-full">Expert Mentorship</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-6 mb-6">Meet Our Ustazs</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Connect with qualified teachers who are dedicated to guiding you on your spiritual journey with patience and wisdom.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {ustazs.length > 0 ? (
                            ustazs.map((ustaz) => (
                                <div key={ustaz.id} className="group bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col transform hover:-translate-y-2">
                                    <div className="h-72 relative overflow-hidden">
                                        {ustaz.photoUrl ? (
                                            <img
                                                src={ustaz.photoUrl.startsWith('http') ? ustaz.photoUrl : `http://localhost:3000${ustaz.photoUrl}`}
                                                alt={ustaz.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-200">
                                                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <h4 className="text-white text-2xl font-bold mb-2">{ustaz.name}</h4>
                                            <div className="flex items-center space-x-3">
                                                <div className={`flex items-center px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${isOnline(ustaz.lastSeen) ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'}`}>
                                                    <div className={`w-2 h-2 rounded-full mr-2 ${isOnline(ustaz.lastSeen) ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                                                    {isOnline(ustaz.lastSeen) ? 'Online Now' : formatLastSeen(ustaz.lastSeen)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center text-sm text-gray-500 mb-6 bg-gray-50 w-fit px-3 py-1 rounded-lg">
                                            <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            {ustaz.location || 'Global'}
                                        </div>
                                        <p className="text-gray-600 mb-8 line-clamp-3 flex-1 leading-relaxed text-lg">
                                            {ustaz.bio || "Dedicated Quran teacher committed to helping students achieve their Hifz goals with patience and expertise."}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-gray-100 pt-6 mb-8">
                                            <div className="text-center px-4">
                                                <div className="text-2xl font-black text-gray-900">{ustaz.studentCount || 0}</div>
                                                <div className="text-xs text-gray-400 uppercase tracking-wider font-bold mt-1">Students</div>
                                            </div>
                                            <div className="w-px h-10 bg-gray-100"></div>
                                            <div className="text-center px-4">
                                                <div className="text-2xl font-black text-gray-900">{ustaz.freeSlots || 0}</div>
                                                <div className="text-xs text-gray-400 uppercase tracking-wider font-bold mt-1">Slots</div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleJoinClass(ustaz.id)}
                                            className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:transform active:scale-95 flex items-center justify-center group-hover:shadow-emerald-300"
                                        >
                                            Request to Join
                                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                                </div>
                                <p className="text-gray-500 text-xl font-medium">No Ustazs available at the moment.</p>
                                <p className="text-gray-400 mt-2">Please check back soon.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-32 bg-emerald-900 relative overflow-hidden text-white">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabesque.png")' }}></div>
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
                    <svg className="relative block w-full h-16 md:h-32" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-emerald-300 font-bold tracking-widest uppercase text-sm bg-emerald-800 px-4 py-2 rounded-full border border-emerald-700">Simple Process</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-6 mb-6">Your Path to Mastery</h2>
                        <p className="text-xl text-emerald-100 max-w-2xl mx-auto">Three simple steps to start your journey of memorization.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-emerald-800 -translate-y-1/2 z-0"></div>

                        {[
                            { step: 1, title: "Create Profile", desc: "Sign up and tell us about your current Hifz level and goals.", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                            { step: 2, title: "Connect with Ustaz", desc: "Find a mentor who fits your schedule and learning style.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
                            { step: 3, title: "Start Revising", desc: "Attend live sessions, track progress, and achieve your milestones.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }
                        ].map((item) => (
                            <div key={item.step} className="relative z-10 text-center group">
                                <div className="w-24 h-24 mx-auto bg-emerald-800 rounded-full flex items-center justify-center text-emerald-300 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl border-4 border-emerald-900">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                                <p className="text-emerald-200 leading-relaxed">{item.desc}</p>
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
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4">Common Questions</h2>
                        <p className="text-gray-500 text-lg">Everything you need to know about the platform.</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                                <button
                                    className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                                    <span className={`transform transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-emerald-500' : 'text-gray-400'}`}>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-2">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer is now handled by PublicLayout, removing it from here to avoid duplication if I added it there. 
                Wait, I didn't add it to PublicLayout yet in the previous step because I wasn't sure.
                Let's keep it here for now or move it. 
                Actually, the user wants the home page to be attractive. 
                I will remove Footer from here and add it to PublicLayout in a separate step if needed, 
                but for now I'll leave it here to ensure it shows up. 
                Actually, better to have it in PublicLayout. 
                I will REMOVE it from here and rely on PublicLayout. 
                Wait, I need to update PublicLayout to include Footer then.
                Let's do that in the next step. For now, I'll remove it from here.
            */}
        </div>
    );
};

export default Home;
