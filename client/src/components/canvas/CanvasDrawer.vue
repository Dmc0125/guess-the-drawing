<template>
  <VueCanvas
    :mouse-down-listener="onMouseDown"
    :mouse-up-listener="onMouseUp"
    :mouse-move-listener="onMouseMove"
    :mouse-out-listener="onMouseOut"
    @canvas-resize="redraw"
  ></VueCanvas>
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
