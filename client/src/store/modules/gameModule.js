const gameModule = {
  state: {
    players: [],
  },
  getters: {
    getPlayers: state => state.players,
  },
  actions: {
    addPlayers: (context, playerData) => {
      if (playerData.length) {
        context.state.players = [...context.state.players, ...playerData];
      }

      context.state.players.push(playerData);
    },
    setPlayers: (context, players) => {
      context.state.players = players;
    },
  },
};

export default gameModule;
