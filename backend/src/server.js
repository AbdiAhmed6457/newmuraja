const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174"],
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Socket.io Logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_room', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room ${userId}`);
    });

    socket.on('send_message', (data) => {
        // data: { senderId, receiverId, content }
        io.to(data.receiverId).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

app.get('/', (req, res) => {
    res.send('Muraja API is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/schedule', require('./routes/scheduleRoutes'));
app.use('/api/student', require('./routes/feedbackRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
