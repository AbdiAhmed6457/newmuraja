import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'STUDENT',
        category: 'Beginner'
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden py-12">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Quran Background"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-black/50"></div>
            </div>

            {/* Register Card */}
            <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Join Us</h1>
                    <p className="text-emerald-100">Start your Hifz journey today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-emerald-100">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-3 bg-white/5 border border-emerald-200/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-emerald-200/50 transition-all"
                            placeholder="Abdullah Ahmed"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-emerald-100">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-3 bg-white/5 border border-emerald-200/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-emerald-200/50 transition-all"
                            placeholder="name@example.com"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-emerald-100">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-3 bg-white/5 border border-emerald-200/30 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-emerald-200/50 transition-all"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-emerald-100">Role</label>
                            <select
                                name="role"
                                className="w-full px-4 py-3 bg-white/10 border border-emerald-200/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-white [&>option]:text-gray-900"
                                onChange={handleChange}
                            >
                                <option value="STUDENT">Student</option>
                                <option value="USTAZ">Ustaz</option>
                            </select>
                        </div>
                        {formData.role === 'STUDENT' && (
                            <div>
                                <label className="block mb-2 text-sm font-medium text-emerald-100">Level</label>
                                <select
                                    name="category"
                                    className="w-full px-4 py-3 bg-white/10 border border-emerald-200/30 rounded-lg focus:ring-2 focus:ring-emerald-400 text-white [&>option]:text-gray-900"
                                    onChange={handleChange}
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Hafidh">Hafidh</option>
                                    <option value="Muraja">Muraja</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-3.5 mt-4 font-bold text-emerald-900 bg-emerald-400 rounded-lg hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transform transition-all active:scale-95 shadow-lg"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-center text-emerald-100">
                    Already have an account?{' '}
                    <Link to="/login" className="text-white font-semibold hover:text-emerald-300 underline decoration-emerald-400/50 hover:decoration-emerald-300 transition-all">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
