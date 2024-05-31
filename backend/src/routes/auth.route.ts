import express from 'express';
import {
  login,
  logout,
  signup,
  getMe,
} from '../controllers/auth.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// <url>/api/auth/login
router.post('/login', login);
router.get('/me', protectRoute, getMe); //to check if the user is logged in or not on page refresh
//when we hit the end point /me then first we are gonna run protectRoute middleware/function
router.post('/logout', logout);
router.post('/signup', signup);

export default router;
