const ChatMessage = require('../_models/ChatMessage');

const createMessage = async (messageData) => {
    const { message, recipient, sender } = messageData;
    console.log(messageData)

    const newMessage = new ChatMessage({
        message: message,
        recipient: recipient,
        sender: sender
    });

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