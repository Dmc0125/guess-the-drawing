import Vue from 'vue';

const state = Vue.observable({
  name: null,
  isLoading: false,
});

// GETTERS
export const getName = () => state.name;
export const isLoading = () => state.isLoading;

// ACTIONS
export const setName = newName => {
  state.name = newName;
};
export const toggleLoading = () => {
  state.isLoading = !state.isLoading;
};
