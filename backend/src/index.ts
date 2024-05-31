import express from 'express';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
  console.log(`Your Server is running at http://localhost:${PORT}`);
});
