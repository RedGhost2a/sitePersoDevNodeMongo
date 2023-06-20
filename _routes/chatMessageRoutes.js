const express = require('express');
const ChatMessageController = require('../_controllers/ChatMessageController');
const router = express.Router();

router.post('/messages', ChatMessageController.createMessage);
router.get('/messages/:userId1/:userId2', ChatMessageController.getMessagesBetweenUsers);

module.exports = router;
