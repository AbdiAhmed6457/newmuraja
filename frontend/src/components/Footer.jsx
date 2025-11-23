import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-green-800 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-yellow-400">Muraja</h3>
                        <p className="text-green-100">
                            Empowering students and teachers to achieve excellence in Quran revision and memorization.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-green-100 hover:text-white">Home</Link></li>
                            <li><Link to="/services" className="text-green-100 hover:text-white">Services</Link></li>
                            <li><Link to="/about" className="text-green-100 hover:text-white">About Us</Link></li>
                            <li><Link to="/login" className="text-green-100 hover:text-white">Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contact</h3>
                        <p className="text-green-100">Email: support@muraja.com</p>
                        <p className="text-green-100">Phone: +123 456 7890</p>
                    </div>
                </div>
                <div className="mt-8 border-t border-green-700 pt-8 text-center">
                    <p className="text-green-200">&copy; 2025 Muraja Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
