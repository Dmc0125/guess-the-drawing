const gameModule = {
  state: {
    players: [],
  },
  getters: {
    getPlayers: state => state.players.sort((p1, p2) => p2.points - p1.points),
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
