import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

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
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md w-96">
                <h2 className="mb-4 text-2xl font-bold text-center">Register</h2>
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Name</label>
                        <input type="text" name="name" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Email</label>
                        <input type="email" name="email" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Password</label>
                        <input type="password" name="password" className="w-full px-3 py-2 border rounded" onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Role</label>
                        <select name="role" className="w-full px-3 py-2 border rounded" onChange={handleChange}>
                            <option value="STUDENT">Student</option>
                            <option value="USTAZ">Ustaz</option>
                        </select>
                    </div>
                    {formData.role === 'STUDENT' && (
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-bold text-gray-700">Category</label>
                            <select name="category" className="w-full px-3 py-2 border rounded" onChange={handleChange}>
                                <option value="Beginner">Beginner</option>
                                <option value="Hafidh">Hafidh</option>
                                <option value="Muraja">Muraja</option>
                            </select>
                        </div>
                    )}
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
