import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        { question: "How do I choose an Ustaz?", answer: "You can browse our list of qualified Ustaz, view their profiles, specialties, and schedules, and choose the one that best fits your needs." },
        { question: "Is the platform free?", answer: "We offer both free and premium plans. The free plan gives you access to basic tracking tools, while premium plans include one-on-one sessions." },
        { question: "Can I track my Hifz progress?", answer: "Yes! Our dashboard allows you to log your daily memorization and revision, giving you visual progress reports." },
        { question: "What if I miss a class?", answer: "You can easily reschedule classes through your dashboard, subject to your Ustaz's availability." }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-green-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover opacity-20"
                        src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Quran Background"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Master Your <span className="text-yellow-400">Hifz Journey</span>
                    </h1>
                    <p className="mt-6 text-xl text-green-100 max-w-3xl">
                        Join Muraja, the premier platform connecting students with expert Ustaz for personalized Quran revision, tracking, and spiritual growth.
                    </p>
                    <div className="mt-10 flex space-x-4">
                        <Link to="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-900 bg-yellow-400 hover:bg-yellow-500">
                            Get Started
                        </Link>
                        <Link to="/about" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-800 hover:bg-green-700">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-green-800">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
                        <div>
                            <div className="text-4xl font-extrabold text-yellow-400">500+</div>
                            <div className="mt-2 text-lg font-medium text-green-100">Active Students</div>
                        </div>
                        <div>
                            <div className="text-4xl font-extrabold text-yellow-400">50+</div>
                            <div className="mt-2 text-lg font-medium text-green-100">Qualified Ustaz</div>
                        </div>
                        <div>
                            <div className="text-4xl font-extrabold text-yellow-400">10k+</div>
                            <div className="mt-2 text-lg font-medium text-green-100">Pages Revised</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-green-600 tracking-wide uppercase">Process</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            How It Works
                        </p>
                    </div>
                    <div className="mt-10">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                            <div className="text-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto text-xl font-bold">1</div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Register & Profile</h3>
                                <p className="mt-2 text-base text-gray-500">Create your account and set up your profile with your current level and goals.</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto text-xl font-bold">2</div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Find an Ustaz</h3>
                                <p className="mt-2 text-base text-gray-500">Browse our list of qualified teachers and book a slot that fits your schedule.</p>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto text-xl font-bold">3</div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Start Revising</h3>
                                <p className="mt-2 text-base text-gray-500">Attend sessions, complete daily tasks, and track your progress on the dashboard.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Showcase */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-green-600 tracking-wide uppercase">Our Services</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Tools for Success
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="text-lg font-medium text-gray-900">Personalized Dashboard</div>
                                    <p className="mt-2 text-base text-gray-500">Track your daily tasks, attendance, and progress in one place.</p>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="text-lg font-medium text-gray-900">Expert Ustaz</div>
                                    <p className="mt-2 text-base text-gray-500">Connect with qualified teachers who guide you every step of the way.</p>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="text-lg font-medium text-gray-900">Flexible Scheduling</div>
                                    <p className="mt-2 text-base text-gray-500">Book sessions that fit your lifestyle and availability.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-green-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-center text-green-900 mb-12">What Our Students Say</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-gray-600 italic">"Muraja has completely transformed my revision routine. The tracking features keep me accountable, and my Ustaz is amazing!"</p>
                            <div className="mt-4 flex items-center">
                                <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold">A</div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">Ahmed Ali</p>
                                    <p className="text-sm text-gray-500">Hafidh Student</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-gray-600 italic">"I love how easy it is to find a teacher and schedule sessions. The interface is beautiful and easy to use."</p>
                            <div className="mt-4 flex items-center">
                                <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold">F</div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">Fatima Hassan</p>
                                    <p className="text-sm text-gray-500">Beginner Student</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4">
                                <button
                                    className="flex justify-between items-center w-full text-left focus:outline-none"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                                    <span className="ml-6 flex-shrink-0">
                                        {openFaq === index ? (
                                            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                        ) : (
                                            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <p className="mt-2 text-base text-gray-500">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
