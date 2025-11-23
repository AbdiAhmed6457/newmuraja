import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-green-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Our Services</h1>
                    <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
                        Comprehensive solutions for every stage of your Quranic journey.
                    </p>
                </div>
            </div>

            {/* Curriculum Section */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">Curriculum & Programs</h2>
                        <p className="mt-4 text-lg text-gray-500">Tailored programs designed to meet your specific goals.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">📖</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Nazira (Reading)</h3>
                            <p className="text-gray-500 mb-4">For beginners focusing on correct pronunciation and fluency in reading the Quran.</p>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li>• Makharij correction</li>
                                <li>• Fluency practice</li>
                                <li>• Basic Tajweed rules</li>
                            </ul>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">🧠</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Hifz (Memorization)</h3>
                            <p className="text-gray-500 mb-4">Structured memorization program with daily targets and revision cycles.</p>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li>• Daily new lesson</li>
                                <li>• Recent revision (Sabaq Para)</li>
                                <li>• Old revision (Amma Para)</li>
                            </ul>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">✨</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Muraja (Revision)</h3>
                            <p className="text-gray-500 mb-4">Dedicated to Huffaz who want to strengthen and retain their memorization.</p>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li>• Intensive revision plans</li>
                                <li>• Mistake tracking</li>
                                <li>• Mock tests</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">Simple Pricing</h2>
                        <p className="mt-4 text-lg text-gray-500">Choose the plan that fits your learning needs.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Free Plan */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="px-6 py-8">
                                <h3 className="text-2xl font-bold text-gray-900 text-center">Basic</h3>
                                <p className="mt-4 text-center text-gray-500">For self-learners</p>
                                <div className="mt-8 flex justify-center items-baseline">
                                    <span className="text-5xl font-extrabold text-gray-900">$0</span>
                                    <span className="ml-1 text-xl text-gray-500">/mo</span>
                                </div>
                                <ul className="mt-8 space-y-4">
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Access to Dashboard</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Progress Tracking</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Community Access</li>
                                </ul>
                            </div>
                            <div className="px-6 py-8 bg-gray-50">
                                <Link to="/register" className="block w-full py-3 px-4 rounded-md shadow bg-green-600 text-white font-medium hover:bg-green-700 text-center">
                                    Sign Up Free
                                </Link>
                            </div>
                        </div>

                        {/* Standard Plan */}
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-yellow-400 transform scale-105">
                            <div className="px-6 py-8">
                                <h3 className="text-2xl font-bold text-gray-900 text-center">Standard</h3>
                                <p className="mt-4 text-center text-gray-500">For regular students</p>
                                <div className="mt-8 flex justify-center items-baseline">
                                    <span className="text-5xl font-extrabold text-gray-900">$29</span>
                                    <span className="ml-1 text-xl text-gray-500">/mo</span>
                                </div>
                                <ul className="mt-8 space-y-4">
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> All Basic Features</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 4 Sessions / Month</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Direct Ustaz Chat</li>
                                </ul>
                            </div>
                            <div className="px-6 py-8 bg-gray-50">
                                <Link to="/register" className="block w-full py-3 px-4 rounded-md shadow bg-yellow-400 text-green-900 font-medium hover:bg-yellow-500 text-center">
                                    Get Started
                                </Link>
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="px-6 py-8">
                                <h3 className="text-2xl font-bold text-gray-900 text-center">Premium</h3>
                                <p className="mt-4 text-center text-gray-500">For intensive learning</p>
                                <div className="mt-8 flex justify-center items-baseline">
                                    <span className="text-5xl font-extrabold text-gray-900">$59</span>
                                    <span className="ml-1 text-xl text-gray-500">/mo</span>
                                </div>
                                <ul className="mt-8 space-y-4">
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> All Standard Features</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 12 Sessions / Month</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Priority Support</li>
                                </ul>
                            </div>
                            <div className="px-6 py-8 bg-gray-50">
                                <Link to="/register" className="block w-full py-3 px-4 rounded-md shadow bg-green-600 text-white font-medium hover:bg-green-700 text-center">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
