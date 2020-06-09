const socketIO = require('socket.io');

const { usersDB } = require('./db');

const { chooseDrawer, resetDrawer } = require('./game-logic/choose-drawer/chooseDrawer');
const getWords = require('./game-logic/words/randomWords');

module.exports = server => {
  const io = socketIO(server);

  let connections = [];
  const setupData = {};

  const gameData = {
    isRunning: false,
    pathCoordinates: [],
    drawerId: null,
  };

  io.on('connection', async socket => {
    const connectionsBefore = connections;

    connections = await getTotalConnections();
    console.log('Users: ', connections);

    // START THE GAME WHEN 2 FIRST PLAYERS CONNECT
    if (connectionsBefore.length < 2 && connections.length === 2) {
      gameData.isRunning = true;
      startGame();
    }

    if (connections.length > 2) {
      setupData.pathCoordinates = gameData.pathCoordinates;
    }

    function draw(coordinates) {
      gameData.pathCoordinates.push(coordinates);

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
    gameData.drawerId = chooseDrawer(connections);

    await usersDB.update({}, { $set: { isDrawer: false } });
    await usersDB.update({ socketId: gameData.drawerId }, { $set: { isDrawer: true } });

    const players = await usersDB.find({});

    console.log(players);

    io.emit('game-start', players);

    io.to(gameData.drawerId).emit('set-drawer', getWords());
  }

  // async function connectToGame() {
  //   const players = await usersDB.find({});

  // }

  async function playerDisconnected() {
    const players = await getPlayers('name');
    let notEnoughPlayers = false;

    if (connections.length < 2) {
      gameData.pathCoordinates = [];

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
