import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-emerald-900 text-emerald-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <span className="text-3xl">🌙</span>
                            <span className="text-2xl font-bold text-white tracking-wide">Ayaturrahman</span>
                        </div>
                        <p className="text-emerald-200/80 leading-relaxed max-w-md">
                            Empowering students to master the Holy Quran through modern technology and expert mentorship. Join our community of learners today.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
                            <li><Link to="/register" className="hover:text-amber-400 transition-colors">Join Now</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
                        <ul className="space-y-4 text-emerald-200/80">
                            <li className="flex items-start">
                                <svg className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span>123 Islamic Center Way,<br />Knowledge City, KC 12345</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <span>contact@ayaturrahman.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-emerald-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-emerald-400">
                    <p>&copy; {new Date().getFullYear()} Ayaturrahman. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
