import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import {
  getMessage,
  getUsersForSidebar,
  sendMessage,
} from '../controllers/message.controller.js';
const router = express.Router();

//only authenticated users can access this route
router.get('/conversations', protectRoute, getUsersForSidebar);
router.get('/send/:id', protectRoute, getMessage);
router.post('/send/:id', protectRoute, sendMessage);

export default router;
