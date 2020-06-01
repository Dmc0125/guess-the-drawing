const globalModule = {
  state: {
    name: null,
    isLoading: false,
  },
  getters: {
    getName: state => state.name,
    isLoading: state => state.isLoading,
  },
  actions: {
    setName: (context, newName) => {
      context.state.name = newName;
    },
    toggleLoading: context => {
      context.state.isLoading = !context.state.isLoading;
    },
  },
};

export default globalModule;
