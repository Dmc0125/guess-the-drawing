<template>
  <div>
    <vue-canvas
      :mouseDownListener="onMouseDown"
      :mouseUpListener="onMouseUp"
      :mouseMoveListener="onMouseMove"
      :mouseOutListener="onMouseOut"
      @canvas-resize="redraw"
    ></vue-canvas>
  </div>
</template>

<script>
import { useActions, useGetters } from '@u3u/vue-hooks';

import { convertToPercentage } from '@/helpers/normalizeDrawing';

import VueCanvas from '@/components/canvas/VueCanvas.vue';

export default {
  components: {
    VueCanvas,
  },
  setup() {
    const getters = useGetters(['getSocket', 'getCanvasSize']);
    const actions = useActions([
      'draw',
      'redraw',
      'addPathCoordinates',
      'resetPathCoordinates',
    ]);

    let mouseDown = false;

    function onMouseMove(e) {
      if (mouseDown) {
        const pos = {
          x: e.layerX,
          y: e.layerY,
          rect: false,
        };

        addCoordinatesAndEmit(pos);
        actions.draw();
      }
    }

    function onMouseUp() {
      mouseDown = false;
    }

    function onMouseDown(e) {
      mouseDown = true;

      const pos = {
        x: e.layerX,
        y: e.layerY,
        rect: true,
      };

      addCoordinatesAndEmit(pos);
      actions.draw();
    }

    function onMouseOut() {
      mouseDown = false;
    }

    function addCoordinatesAndEmit(pos) {
      const normalizedPos = convertToPercentage(getters.getCanvasSize.value, pos);
      actions.addPathCoordinates(normalizedPos);
      getters.getSocket.value.emit('draw', normalizedPos);
    }

    return {
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onMouseOut,
      redraw: actions.redraw,
    };
  },
};
</script>

<style lang="sass" scoped>
canvas
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)

  border: 1px solid #000
</style>
