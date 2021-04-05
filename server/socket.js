const connectedUsers = {};
const historyMessage = {};

const addMessageToHistory = (senderId, recipientId, payload) => {
  if (historyMessage[senderId]) {
    if (!historyMessage[senderId][recipientId]) {
      historyMessage[senderId][recipientId] = [];
    }
    historyMessage[senderId][recipientId].push(payload);
  } else {
    historyMessage[senderId] = [];
    historyMessage[senderId][recipientId] = [];
    historyMessage[senderId][recipientId].push(payload);
  }
}
module.exports = (server) => {
  const io = require('socket.io').listen(server);

  io.on('connection', (socket) => {
    const socketId = socket.id;
    socket.on('users:connect', (payload) => {
      connectedUsers[socketId] = {
        ...payload,
        socketId,
        activeRoom: null,
      };

      socket.emit('users:list', Object.values(connectedUsers));
      socket.broadcast.emit('users:add', connectedUsers[socketId]);
    })

    socket.on('message:add', (payload) => {
      const {senderId, recipientId, roomId} = payload;
      socket.emit('message:add', payload);
      socket.to(roomId).emit('message:add', payload)

      addMessageToHistory(senderId, recipientId, payload)

      if(senderId !== recipientId) {
        addMessageToHistory(recipientId, senderId, payload)
      }
    })

    socket.on('message:history', ({userId, recipientId}) => {
      console.log(userId)
      if(historyMessage[userId] && historyMessage[userId][recipientId]) {
        socket.emit('message:history', historyMessage[userId][recipientId]);
      }
    })

    socket.on('disconnect', () => {
      delete connectedUsers[socketId];

      socket.broadcast.emit('users:leave', socketId);
    })
  })
}
