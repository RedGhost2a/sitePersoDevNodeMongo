const ChatMessage = require('../_models/ChatMessage');

 const createMessage = async (messageData) => {
    const newMessage = new ChatMessage(messageData);
    return await newMessage.save();
}

 const getMessagesBetweenUsers = async (userId1, userId2) => {
    return ChatMessage.find({
        $or: [
            {sender: userId1, recipient: userId2},
            {sender: userId2, recipient: userId1}
        ]
    }).sort('createdAt');
}
module.exports={
    createMessage,
    getMessagesBetweenUsers,
}