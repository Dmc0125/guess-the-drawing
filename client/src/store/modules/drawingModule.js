import { convertToPixels } from '@/helpers/normalizeDrawing';
import drawLine from '@/helpers/draw';

const drawingModule = {
  state: {
    canvasCtx: null,
    canvasSize: null,
    isDrawing: false,
    pathCoordinates: [],
  },
  getters: {
    getCanvasCtx: state => state.canvasCtx,
    getCanvasSize: state => state.canvasSize,
    getIsDrawing: state => state.isDrawing,
    getPathCoordinates: state => state.pathCoordinates,
  },
  actions: {
    setCanvasCtx: ({ state }, canvasCtx) => {
      state.canvasCtx = canvasCtx;
    },
    setCanvasSize: ({ state }, canvasSize) => {
      state.canvasSize = canvasSize;
    },
    setIsDrawing: ({ state }, data) => {
      state.isDrawing = data;
    },
    addPathCoordinates: ({ state }, coordinates) => {
      state.pathCoordinates.push(coordinates);
    },
    setPathCoordinates: ({ state }, pathCoordinates) => {
      state.pathCoordinates = pathCoordinates;
    },
    resetPathCoordinates: ({ state }) => {
      state.pathCoordinates = [];
    },
    draw: ({ state }) => {
      const { canvasCtx, canvasSize, pathCoordinates } = state;

      const {
        x: currX, y: currY, rect,
      } = convertToPixels(canvasSize, pathCoordinates[pathCoordinates.length - 1]);

      if (rect) {
        canvasCtx.fillStyle = '#000';
        canvasCtx.fillRect(currX, currY, 2, 2);
        return;
      }

      if (pathCoordinates.length > 1) {
        const {
          x: prevX, y: prevY,
        } = convertToPixels(canvasSize, pathCoordinates[pathCoordinates.length - 2]);

        drawLine(canvasCtx, {
          prevX,
          prevY,
          currX,
          currY,
        });
      }
    },
    redraw: ({ state }) => {
      const { pathCoordinates, canvasCtx, canvasSize } = state;

      if (state.pathCoordinates.length <= 1) return;

      if (state.pathCoordinates.length === 1) {
        const { x: currX, y: currY } = convertToPixels(canvasSize, pathCoordinates[1]);

        canvasCtx.fillStyle = '#000';
        canvasCtx.fillRect(currX, currY, 2, 2);
        return;
      }

      for (let i = 1; i < pathCoordinates.length; i++) {
        const { x: prevX, y: prevY } = convertToPixels(canvasSize, pathCoordinates[i - 1]);
        const {
          x: currX, y: currY, rect: currRect,
        } = convertToPixels(canvasSize, pathCoordinates[i]);

        if (currRect) {
          canvasCtx.fillStyle = '#000';
          canvasCtx.fillRect(currX, currY, 2, 2);
          // eslint-disable-next-line no-continue
          continue;
        }

        drawLine(canvasCtx, {
          prevX,
          prevY,
          currX,
          currY,
        });
      }
    },
  },
};

export default drawingModule;
