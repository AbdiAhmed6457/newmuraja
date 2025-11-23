const About = () => {
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="relative bg-green-800 py-24">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1584286595398-a59f21d313f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Mosque Background"
                        className="w-full h-full object-cover opacity-10"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About Muraja</h1>
                    <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
                        Bridging the gap between tradition and technology to serve the Quran.
                    </p>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Our Mission
                        </h2>
                        <p className="mt-3 max-w-3xl text-lg text-gray-500">
                            At Muraja, we believe that every student deserves access to quality Quranic education. Our platform is designed to make revision consistent, measurable, and accessible to everyone, regardless of location. We strive to create a digital ecosystem that honors the sanctity of the Quran while leveraging modern tools for efficiency.
                        </p>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </div>
                                <p className="ml-4 text-lg leading-6 font-medium text-gray-900">Qualified Teachers</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </div>
                                <p className="ml-4 text-lg leading-6 font-medium text-gray-900">Structured Learning</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </div>
                                <p className="ml-4 text-lg leading-6 font-medium text-gray-900">Community Focused</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-0">
                        <div className="rounded-lg shadow-lg overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Quran Study"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="bg-green-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="text-xl font-bold text-gray-900">Ikhlas</h3>
                            <p className="mt-2 text-gray-500">Sincerity in all our actions.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="text-4xl mb-4">⭐</div>
                            <h3 className="text-xl font-bold text-gray-900">Ihsan</h3>
                            <p className="mt-2 text-gray-500">Excellence in service.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="text-4xl mb-4">📚</div>
                            <h3 className="text-xl font-bold text-gray-900">Ilm</h3>
                            <p className="mt-2 text-gray-500">Knowledge based approach.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow text-center">
                            <div className="text-4xl mb-4">🌱</div>
                            <h3 className="text-xl font-bold text-gray-900">Growth</h3>
                            <p className="mt-2 text-gray-500">Continuous improvement.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">Meet Our Team</h2>
                        <p className="mt-4 text-lg text-gray-500">The people behind the platform.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="text-center">
                            <div className="h-32 w-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Founder" className="h-full w-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Abdi Ahmed</h3>
                            <p className="text-green-600">Founder & CEO</p>
                        </div>
                        <div className="text-center">
                            <div className="h-32 w-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="CTO" className="h-full w-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Omar Farooq</h3>
                            <p className="text-green-600">Head of Education</p>
                        </div>
                        <div className="text-center">
                            <div className="h-32 w-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Lead Dev" className="h-full w-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Sarah Khan</h3>
                            <p className="text-green-600">Community Manager</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
