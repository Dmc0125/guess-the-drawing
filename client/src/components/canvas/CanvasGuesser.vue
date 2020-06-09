<template>
  <VueCanvas
    @canvas-resize="redraw"
  ></VueCanvas>
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
