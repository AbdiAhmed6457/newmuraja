import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      // Poll for unread messages every 30 seconds
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/chat/unread/count', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUnreadCount(res.data.count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        logout();
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-emerald-900/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <span className="text-2xl">🌙</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">Ayaturrahman</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-emerald-100 hover:text-white font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <Link
                  to={user.role === 'STUDENT' ? '/student' : user.role === 'USTAZ' ? '/ustaz' : '/admin'}
                  className="text-white hover:text-amber-400 transition-colors"
                  title="Dashboard"
                >
                  Dashboard
                </Link>
                <Link
                  to={user.role === 'STUDENT' ? '/student' : '/ustaz/students'}
                  state={{ openChat: true }}
                  className="relative p-2 text-emerald-100 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-red-500/10 text-red-100 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Link to="/login" className="text-white hover:text-emerald-200 font-medium transition-colors">Login</Link>
                <Link to="/register" className="px-5 py-2 rounded-full bg-amber-400 text-emerald-900 font-bold hover:bg-amber-300 transition-all shadow-lg hover:shadow-amber-400/20 transform hover:-translate-y-0.5">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-emerald-900/95 backdrop-blur-md border-t border-emerald-800 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg text-emerald-100 hover:text-white hover:bg-emerald-800 px-4 py-2 rounded-lg transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-emerald-800 pt-4 mt-4">
            {user ? (
              <div className="space-y-4">
                <Link
                  to={user.role === 'STUDENT' ? '/student' : user.role === 'USTAZ' ? '/ustaz' : '/admin'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg text-white hover:bg-emerald-800 px-4 py-2 rounded-lg"
                >
                  Dashboard
                </Link>
                <Link
                  to={user.role === 'STUDENT' ? '/student' : '/ustaz/students'}
                  state={{ openChat: true }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-lg text-emerald-100 hover:bg-emerald-800 px-4 py-2 rounded-lg"
                >
                  <span>Messages</span>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {unreadCount} New
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-lg text-red-300 hover:text-red-100 hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-4 px-4">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-3 rounded-lg border border-emerald-700 text-emerald-100 font-medium hover:bg-emerald-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-3 rounded-lg bg-amber-400 text-emerald-900 font-bold hover:bg-amber-300 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;