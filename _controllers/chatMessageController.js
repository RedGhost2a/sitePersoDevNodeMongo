const ChatMessageService = require('../_service/ChatMessageService');

 const createMessage = async (req, res) => {
    const message = await ChatMessageService.createMessage(req.body);
    return res.status(201).json(message);
}

 const getMessagesBetweenUsers = async (req, res) => {
    const messages = await ChatMessageService.getMessagesBetweenUsers(req.params.userId1, req.params.userId2);
    return res.status(200).json(messages);
}
module.exports={
    createMessage,
    getMessagesBetweenUsers,
}