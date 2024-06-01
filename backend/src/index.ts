import express from 'express';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';

import dotenv from 'dotenv';
import { app, server } from './socket/socket.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

server.listen(PORT, () => {
  console.log(`Your Server is running at http://localhost:${PORT}`);
});
