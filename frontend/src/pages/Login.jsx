import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            toast.success('Logged in successfully');
            if (user.role === 'STUDENT') navigate('/student');
            else if (user.role === 'USTAZ') navigate('/ustaz');
            else if (user.role === 'ADMIN') navigate('/admin');
        } catch (err) {
            toast.error('Invalid credentials');
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Mosque Background"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-black/40"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-emerald-100">Continue your journey with Ayaturrahman</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-emerald-100">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-white/5 border border-emerald-200/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-emerald-200/50 transition-all"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-emerald-100">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-white/5 border border-emerald-200/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-emerald-200/50 transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-3.5 font-bold text-emerald-900 bg-emerald-400 rounded-lg hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transform transition-all active:scale-95 shadow-lg"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-emerald-100">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-white font-semibold hover:text-emerald-300 underline decoration-emerald-400/50 hover:decoration-emerald-300 transition-all">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
