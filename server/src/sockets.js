const socketIO = require('socket.io');

const db = require('./db');

module.exports = server => {
  const io = socketIO(server);

  let connections = [];

  const users = {};

  io.on('connection', async socket => {
    connections = await getTotalConnections();
    console.log('Users: ', connections);

    setDrawer(socket);

    function draw(coordinates) {
      socket.broadcast.emit('drawCoordinates', coordinates);
    }

    function preset(name) {
      users[socket.id] = name;
    }

    async function disconnect() {
      console.log('user diconnected', socket.id);
      connections = await getTotalConnections();

      console.log('Delete', users[socket.id]);
      db.remove({ name: users[socket.id] });

      setNewDrawer(socket);
    }

    socket.on('draw', draw);
    socket.on('preset', preset);
    socket.on('disconnect', disconnect);
  });

  function setDrawer(socket) {
    if (connections.length === 1) {
      socket.emit('setDrawer', true);
    }
  }

  function setNewDrawer(socket) {
    // TODO: Fix selecting new drawer
    if (connections.length === 1) {
      setDrawer(socket);
      return;
    }

    socket.emit('setDrawer', true);
    socket.broadcast.emit('setDrawer', false);
  }

  function getRandomID() {
    const random = Math.floor(Math.random() * connections.length - 1);
    return connections[random];
  }

  function getTotalConnections() {
    return new Promise((resolve) => {
      io.clients((error, clients) => {
        if (clients) {
          return resolve(clients);
        }
        return resolve([]);
      });
    });
  }
};
