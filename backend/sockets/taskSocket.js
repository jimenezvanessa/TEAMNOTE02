module.exports = (io) => {
  // All clients join 'team-room' for board sync
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.join('team-room');

    // Handle task events from client (after API call confirmation)
    socket.on('task:created', (task) => {
      socket.to('team-room').emit('task:created', task);
    });

    socket.on('task:updated', (task) => {
      socket.to('team-room').emit('task:updated', task);
    });

    socket.on('task:deleted', (taskId) => {
      socket.to('team-room').emit('task:deleted', taskId);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

