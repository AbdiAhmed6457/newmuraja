import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Navbar = () => {
  const { user, logout } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      socket.emit('join_room', user.id);

      socket.on('receive_message', () => {
        fetchUnreadCount();
      });

      return () => {
        socket.off('receive_message');
      };
    }
  }, [user]);

  useEffect(() => {
    // Reset count if user visits the messages page/dashboard with chat open
    if (location.pathname === '/student' && location.state?.openChat) {
      // Ideally we'd only decrement for the specific user, but for now we can re-fetch
      fetchUnreadCount();
    }
  }, [location]);

  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/chat/unread/count');
      setUnreadCount(res.data.count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">Muraja</Link>
            <div className="hidden ml-10 space-x-8 md:flex">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              {user && user.role === 'STUDENT' && (
                <Link to="/find-ustaz" className="text-gray-600 hover:text-gray-900">Find Ustaz</Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <Link
                to={user.role === 'STUDENT' ? '/student' : '/ustaz/students'}
                state={{ openChat: true }}
                className="text-gray-600 hover:text-green-600 font-medium flex items-center relative"
              >
                <div className="relative">
                  <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline">Messages</span>
              </Link>
            )}
            {user ? (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
                <Link to={user.role === 'STUDENT' ? '/student' : user.role === 'USTAZ' ? '/ustaz' : '/admin'} className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <button onClick={logout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;