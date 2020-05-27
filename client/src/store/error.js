import Vue from 'vue';

const state = Vue.observable({
  message: null,
});

export const getMessage = () => state.message;

export const setMessage = newMessage => {
  state.message = newMessage;
};
export const resetMessage = () => {
  state.message = null;
};
