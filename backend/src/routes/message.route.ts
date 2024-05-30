import express from 'express';
const router = express.Router();

// <url>/api/messages/conversations
router.get('/conversations', (req, res) => {
  res.send('Get all conversations');
});

export default router;
