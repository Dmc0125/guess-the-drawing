const errorModule = {
  state: {
    message: null,
  },
  getters: {
    getErrorMessage: state => state.message,
  },
  actions: {
    setMessage: ({ state }, newMessage) => {
      state.message = newMessage;
    },
    resetMessage: ({ state }) => {
      state.message = null;
    },
  },
};

export default errorModule;
