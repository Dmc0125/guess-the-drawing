const socketIO = require('socket.io');

const { usersDB } = require('./db');

const { chooseDrawer, resetDrawer } = require('./game-logic/choose-drawer/chooseDrawer');
const getWords = require('./game-logic/words/randomWords');

module.exports = server => {
  const io = socketIO(server);

  let connections = [];
  let pathCoordinates = [];
  const gameRunning = false;
  const setupData = {};

  io.on('connection', async socket => {
    connections = await getTotalConnections();
    console.log('Users: ', connections);

    if (connections.length > 2) {
      setupData.pathCoordinates = pathCoordinates;
    }

    startGame();

    function draw(coordinates) {
      pathCoordinates.push(coordinates);

      socket.broadcast.emit('drawCoordinates', coordinates);
    }

    async function disconnect() {
      console.log('user diconnected', socket.id);
      connections = await getTotalConnections();

      usersDB.remove({ socketId: socket.id });

      playerDisconnected();
    }

    socket.on('draw', draw);
    socket.on('disconnect', disconnect);
  });

  async function startGame() {
    if (connections.length >= 2) {
      const players = await getPlayers('name');
      const drawerId = chooseDrawer(connections);

      setupData.players = players;

      io.emit('game-start', setupData);

      io.to(drawerId).emit('set-drawer', getWords());
    }
  }

  async function playerDisconnected() {
    const players = await getPlayers('name');
    let notEnoughPlayers = false;

    if (connections.length < 2) {
      pathCoordinates = [];

      notEnoughPlayers = true;
      resetDrawer();
    }

    io.emit('player-disconnected', {
      notEnoughPlayers,
      players,
    });
  }

  async function getPlayers(property) {
    const players = await usersDB.find({});

    if (!property) {
      return players;
    }

    return players.map(player => player[property]);
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
