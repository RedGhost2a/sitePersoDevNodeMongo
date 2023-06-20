const ChatMessage = require('../_models/ChatMessage');

const createMessage = async (messageData) => {
    const { message, recipient, sender } = messageData; // Assurez-vous d'extraire les propriétés nécessaires

    const newMessage = new ChatMessage({
        message: message,     // Assurez-vous de passer la valeur correcte pour 'message'
        recipient: recipient, // Assurez-vous de passer la valeur correcte pour 'recipient'
        sender: sender        // Assurez-vous de passer la valeur correcte pour 'sender'
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