import { useState, useEffect } from 'react';
import axios from 'axios';

const StudentTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/tasks');
            setTasks(res.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                {tasks.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No tasks assigned yet.</div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <li key={task.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-medium text-emerald-600 truncate">{task.title}</h3>
                                        <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                                        <div className="mt-2 flex items-center text-xs text-gray-400">
                                            <span className="mr-2">Assigned by: {task.ustaz?.name || 'Unknown'}</span>
                                            <span>• {new Date(task.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${task.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {task.isCompleted ? 'Completed' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default StudentTasks;
