import Vue from 'vue';

const state = Vue.observable({
  socket: null,
});

export const getSocket = () => state.socket;

export const setSocket = socket => {
  state.socket = socket;
};

export const emitEvent = {
  draw: data => {
    state.socket.emit('draw', data);
  },
};
