import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const socket = io('http://localhost:3000');

const ChatWindow = ({ otherUser, onClose }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [file, setFile] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        socket.emit('join_room', user.id);

        fetchMessages();
        markMessagesAsRead();

        socket.on('receive_message', (data) => {
            if (data.senderId === otherUser.id || data.senderId === user.id) {
                setMessages((prev) => [...prev, data]);
                if (data.senderId === otherUser.id) {
                    markMessagesAsRead();
                }
            }
        });

        return () => {
            socket.off('receive_message');
        };
    }, [otherUser.id, user.id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/chat/${otherUser.id}`);
            setMessages(res.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const markMessagesAsRead = async () => {
        try {
            await axios.put('http://localhost:3000/api/chat/read', { senderId: otherUser.id });
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() && !file) return;

        const formData = new FormData();
        formData.append('receiverId', otherUser.id);
        formData.append('content', newMessage);
        if (file) {
            formData.append('file', file);
        }

        // Optimistic UI update
        const tempMessage = {
            id: Date.now(), // Temporary ID
            senderId: user.id,
            receiverId: otherUser.id,
            content: newMessage,
            attachmentUrl: file ? URL.createObjectURL(file) : null,
            attachmentType: file?.type.startsWith('image/') ? 'IMAGE' : 'FILE',
            createdAt: new Date().toISOString(),
            isRead: false
        };
        setMessages((prev) => [...prev, tempMessage]);
        setNewMessage('');
        setFile(null);

        try {
            await axios.post('http://localhost:3000/api/chat/send', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // We rely on socket or next fetch to sync real ID
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const deleteMessage = async (messageId) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        try {
            await axios.delete(`http://localhost:3000/api/chat/${messageId}`);
            setMessages((prev) => prev.filter(msg => msg.id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatLastSeen = (dateString) => {
        if (!dateString) return 'Offline';
        const date = new Date(dateString);
        const now = new Date();
        const diff = (now - date) / 1000 / 60; // minutes
        if (diff < 5) return 'Online';
        if (diff < 60) return `Last seen ${Math.floor(diff)}m ago`;
        return `Last seen ${date.toLocaleDateString()}`;
    };

    return (
        <>
            {/* Backdrop to close on click outside */}
            <div className="fixed inset-0 z-40" onClick={onClose}></div>

            <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white shadow-2xl rounded-lg border border-gray-200 flex flex-col z-50 overflow-hidden">
                {/* Header */}
                <div className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
                    <div className="flex items-center">
                        <div className="relative">
                            <img
                                src={otherUser.photoUrl ? (otherUser.photoUrl.startsWith('http') ? otherUser.photoUrl : `http://localhost:3000${otherUser.photoUrl}`) : "https://via.placeholder.com/40"}
                                alt={otherUser.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-white mr-3"
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{otherUser.name}</h3>
                            <p className="text-xs text-green-100">{formatLastSeen(otherUser.lastSeen)}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-green-700 transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex flex-col ${msg.senderId === user.id ? 'items-end' : 'items-start'} group`}>
                            <div className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm relative ${msg.senderId === user.id
                                    ? 'bg-green-500 text-white rounded-br-none'
                                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                                }`}>
                                {msg.attachmentUrl && (
                                    <div className="mb-2">
                                        {msg.attachmentType === 'IMAGE' ? (
                                            <img src={msg.attachmentUrl.startsWith('blob:') ? msg.attachmentUrl : `http://localhost:3000${msg.attachmentUrl}`} alt="Attachment" className="max-w-full rounded-lg" />
                                        ) : (
                                            <a href={`http://localhost:3000${msg.attachmentUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center underline">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                                View File
                                            </a>
                                        )}
                                    </div>
                                )}
                                {msg.content && <p className="text-sm leading-relaxed">{msg.content}</p>}

                                {/* Delete Button (only for own messages) */}
                                {msg.senderId === user.id && (
                                    <button
                                        onClick={() => deleteMessage(msg.id)}
                                        className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-red-500 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-50 rounded-full"
                                        title="Delete message"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center space-x-1 mt-1 px-1">
                                <span className="text-[10px] text-gray-400">{formatTime(msg.createdAt)}</span>
                                {msg.senderId === user.id && (
                                    <span className={`text-[10px] ${msg.isRead ? 'text-blue-500' : 'text-gray-400'}`}>
                                        {msg.isRead ? '✓✓' : '✓'}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={sendMessage} className="p-3 border-t bg-white flex items-end space-x-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className={`p-2 rounded-full transition ${file ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:bg-gray-100'}`}
                        title="Attach file"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    </button>

                    <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 flex items-center">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={file ? `File: ${file.name}` : "Type a message..."}
                            className="bg-transparent w-full focus:outline-none text-sm text-gray-700"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!newMessage.trim() && !file}
                        className={`p-3 rounded-full text-white shadow-md transition transform ${(!newMessage.trim() && !file) ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:scale-105'}`}
                    >
                        <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        </>
    );
};

export default ChatWindow;
