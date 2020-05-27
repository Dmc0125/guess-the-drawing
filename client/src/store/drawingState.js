import Vue from 'vue';

const state = Vue.observable({
  isDrawing: false,
  pathCoordinates: [],
});

// GETTERS
export const getIsDrawing = () => state.isDrawing;
export const getPathCoordinates = () => state.pathCoordinates;

// ACTIONS
export const setIsDrawing = data => {
  state.isDrawing = data;
};
export const addPathCoordinates = coordinates => {
  state.pathCoordinates.push(coordinates);
};
export const resetPathCoordinates = () => {
  state.pathCoordinates = [];
};
export const draw = ctx => {
  const { x: currX, y: currY, rect } = state.pathCoordinates[state.pathCoordinates.length - 1];

  if (rect) {
    ctx.fillRect(currX, currY, 2, 2);
    return;
  }

  if (state.pathCoordinates.length > 1) {
    const { x: prevX, y: prevY } = state.pathCoordinates[state.pathCoordinates.length - 2];

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }
};
