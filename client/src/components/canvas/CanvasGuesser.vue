<template>
  <vue-canvas
    @canvas-resize="redraw"
  ></vue-canvas>
</template>

<script>
import { useActions, useGetters } from '@u3u/vue-hooks';

import VueCanvas from '@/components/canvas/VueCanvas.vue';

export default {
  components: {
    VueCanvas,
  },
  setup() {
    const getters = useGetters(['getSocket']);
    const actions = useActions([
      'addPathCoordinates',
      'draw',
      'redraw',
    ]);

    getters.getSocket.value.on('drawCoordinates', coordinates => {
      actions.addPathCoordinates(coordinates);
      actions.draw();
    });

    return {
      redraw: actions.redraw,
    };
  },
};
</script>

<style lang="sass" scoped>
canvas
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  border: 1px solid #000
</style>
