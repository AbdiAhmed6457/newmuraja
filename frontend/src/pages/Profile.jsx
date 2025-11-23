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
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile');
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
            {message && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                        {profile.photoUrl ? (
                            <img className="h-16 w-16 object-cover rounded-full" src={profile.photoUrl} alt="Current profile" />
                        ) : (
                            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500">
                                {profile.name ? profile.name.charAt(0) : '?'}
                            </div>
                        )}
                    </div>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input type="file" onChange={handleFileChange} className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "/>
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" value={profile.name || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" name="location" value={profile.location || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Education Level</label>
                    <input type="text" name="educationLevel" value={profile.educationLevel || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="text" name="phoneNumber" value={profile.phoneNumber || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea name="bio" rows="4" value={profile.bio || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;
