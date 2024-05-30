import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

// <url>/api/auth/login
router.post('/login', login);
// <url>/api/auth/logout
router.post('/logout', logout);
// <url>/api/auth/signin
router.post('/signup', signup);

export default router;
