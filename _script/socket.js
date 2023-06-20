const socketIo = require('socket.io');
// const ChatMessageService = require('/_service/chatMessageService');

function setupSocket(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('a user connected');

        // Écouter les événements 'new-message'
        socket.on('new-message', async (message) => {
            console.log('New message:', message);

            // Enregistrer le message dans la base de données
            const savedMessage = await ChatMessageService.createMessage(message);

            // Envoyer le message à tous les clients
            io.emit('new-message', savedMessage);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    return io;
}

module.exports = setupSocket;
