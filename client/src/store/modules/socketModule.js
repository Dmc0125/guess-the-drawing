const socketModule = {
  state: {
    socket: null,
  },
  getters: {
    getSocket: state => state.socket,
  },
  actions: {
    setSocket: (context, socket) => {
      context.state.socket = socket;
    },
  },
};

export default socketModule;
