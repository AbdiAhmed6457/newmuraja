import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
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
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/profile');
            setProfile(res.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', profile.name);
        formData.append('location', profile.location);
        formData.append('educationLevel', profile.educationLevel);
        formData.append('bio', profile.bio);
        formData.append('phoneNumber', profile.phoneNumber);
        if (photo) {
            formData.append('photo', photo);
        } else {
            formData.append('photoUrl', profile.photoUrl);
        }

        try {
            const res = await axios.put('http://localhost:3000/api/users/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setProfile(res.data);
            setMessage('Profile updated successfully');
            setIsEditing(false);
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="max-w-3xl w-full">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Header Background */}
                    <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-500 relative">
                        {message && (
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-emerald-700 text-sm font-semibold shadow">
                                {message}
                            </div>
                        )}
                    </div>

                    <div className="px-8 pb-8">
                        {/* Profile Header */}
                        <div className="relative flex justify-between items-end -mt-12 mb-8">
                            <div className="flex items-end">
                                <div className="relative h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                    {profile.photoUrl ? (
                                        <img
                                            className="h-full w-full object-cover"
                                            src={profile.photoUrl.startsWith('http') ? profile.photoUrl : `http://localhost:3000${profile.photoUrl}`}
                                            alt="Profile"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-emerald-100 text-emerald-500 text-4xl font-bold">
                                            {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
                                        </div>
                                    )}
                                    {isEditing && (
                                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                                            <span className="text-white text-xs font-bold">Change</span>
                                            <input type="file" onChange={handleFileChange} className="hidden" />
                                        </label>
                                    )}
                                </div>
                                <div className="ml-6 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">{profile.name || 'Your Name'}</h1>
                                    <p className="text-emerald-600 font-medium">{profile.role || 'Student'}</p>
                                </div>
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mb-2 px-6 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors shadow-md"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        {/* Content */}
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={profile.name || ''}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={profile.phoneNumber || ''}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={profile.location || ''}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
                                        <input
                                            type="text"
                                            name="educationLevel"
                                            value={profile.educationLevel || ''}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <div className="col-span-full">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                        <textarea
                                            name="bio"
                                            rows="4"
                                            value={profile.bio || ''}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2 text-gray-700 bg-gray-100 rounded-full font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors shadow-md"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</h3>
                                        <div className="mt-2 flex items-center">
                                            <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                            <span className="text-lg">{profile.phoneNumber || 'Not provided'}</span>
                                        </div>
                                        <div className="mt-2 flex items-center">
                                            <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            <span className="text-lg">{profile.location || 'Not provided'}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Education</h3>
                                        <div className="mt-2 flex items-center">
                                            <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                                            <span className="text-lg">{profile.educationLevel || 'Not provided'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">About</h3>
                                    <p className="mt-2 text-gray-600 leading-relaxed">
                                        {profile.bio || 'No bio available yet.'}
                                    </p>
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
