import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState({
        name: '',
        photoUrl: '',
        location: '',
        educationLevel: '',
        bio: '',
        phoneNumber: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/profile');
            setProfile(res.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            toast.error('Failed to load profile');
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append fields only if they have values
        formData.append('name', profile.name || '');
        formData.append('location', profile.location || '');
        formData.append('educationLevel', profile.educationLevel || '');
        formData.append('bio', profile.bio || '');
        formData.append('phoneNumber', profile.phoneNumber || '');

        if (photo) {
            formData.append('photo', photo);
        } else if (profile.photoUrl) {
            // Keep existing photo URL if no new photo
            formData.append('photoUrl', profile.photoUrl);
        }

        try {
            const res = await axios.put('http://localhost:3000/api/users/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setProfile(res.data);
            toast.success('Profile updated successfully');
            setIsEditing(false);
            setPhoto(null);
            setPreviewUrl(null);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error updating profile');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="max-w-4xl w-full">
                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
                    {/* Header Background */}
                    <div className="h-48 bg-gradient-to-r from-emerald-800 to-teal-600 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabesque.png")' }}></div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="px-8 pb-8">
                        {/* Profile Header */}
                        <div className="relative flex flex-col md:flex-row justify-between items-end -mt-20 mb-10">
                            <div className="flex flex-col md:flex-row items-end md:items-end w-full">
                                <div className="relative group">
                                    <div className="h-40 w-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white relative z-10">
                                        {previewUrl ? (
                                            <img className="h-full w-full object-cover" src={previewUrl} alt="Preview" />
                                        ) : profile.photoUrl ? (
                                            <img
                                                className="h-full w-full object-cover"
                                                src={profile.photoUrl.startsWith('http') ? profile.photoUrl : `http://localhost:3000${profile.photoUrl}`}
                                                alt="Profile"
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-emerald-100 text-emerald-600 text-5xl font-bold">
                                                {profile.name ? profile.name.charAt(0).toUpperCase() : user?.name?.charAt(0) || '?'}
                                            </div>
                                        )}

                                        {isEditing && (
                                            <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <svg className="w-8 h-8 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                <span className="text-white text-xs font-bold uppercase tracking-wider">Change Photo</span>
                                                <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 md:mt-0 md:ml-6 md:mb-4 text-center md:text-left flex-1">
                                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{profile.name || user?.name || 'Your Name'}</h1>
                                    <div className="flex items-center justify-center md:justify-start mt-2 space-x-3">
                                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                                            {user?.role || 'Student'}
                                        </span>
                                        {profile.location && (
                                            <span className="flex items-center text-gray-500 text-sm">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {profile.location}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-6 md:mt-0 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transform hover:-translate-y-0.5 flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        {/* Content */}
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="animate-fade-in-up">
                                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <svg className="w-6 h-6 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={profile.name || ''}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-white"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-700">Phone Number</label>
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                value={profile.phoneNumber || ''}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-white"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-700">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={profile.location || ''}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-white"
                                                placeholder="City, Country"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-700">Education Level</label>
                                            <input
                                                type="text"
                                                name="educationLevel"
                                                value={profile.educationLevel || ''}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-white"
                                                placeholder="e.g. Bachelor's, Hifz Student"
                                            />
                                        </div>
                                        <div className="col-span-full space-y-2">
                                            <label className="block text-sm font-bold text-gray-700">Bio</label>
                                            <textarea
                                                name="bio"
                                                rows="4"
                                                value={profile.bio || ''}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all bg-white resize-none"
                                                placeholder="Tell us a bit about yourself..."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setPreviewUrl(null);
                                            setPhoto(null);
                                        }}
                                        className="px-8 py-3 text-gray-600 bg-white border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transform hover:-translate-y-0.5"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-1 space-y-6">
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Contact Info</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center group">
                                                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-emerald-500 shadow-sm mr-4 group-hover:scale-110 transition-transform">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-medium">Phone</p>
                                                    <p className="text-gray-900 font-medium">{profile.phoneNumber || 'Not provided'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center group">
                                                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-emerald-500 shadow-sm mr-4 group-hover:scale-110 transition-transform">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-medium">Location</p>
                                                    <p className="text-gray-900 font-medium">{profile.location || 'Not provided'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center group">
                                                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-emerald-500 shadow-sm mr-4 group-hover:scale-110 transition-transform">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-medium">Education</p>
                                                    <p className="text-gray-900 font-medium">{profile.educationLevel || 'Not provided'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="bg-white rounded-2xl p-8 border border-gray-100 h-full">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">About Me</h3>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {profile.bio || (
                                                <span className="text-gray-400 italic">No bio available. Click "Edit Profile" to add one.</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
