<template>
  <canvas
    ref="cnv"
    :width="cnvSize.width"
    :height="cnvSize.height"
  >
  </canvas>
</template>

<script>
import { ref, watch, onMounted } from '@vue/composition-api';

import { getSocket } from '@/store/socket';
import useCnv from '@/cmp-functions/cnv';
import {
  draw, getPathCoordinates, addPathCoordinates, getIsDrawing, resetPathCoordinates,
} from '@/store/drawingState';

export default {
  setup() {
    const { cnvSize, resetCnvWatcher, setCnvBg } = useCnv();
    const cnv = ref(null);

    let ctx;

    onMounted(() => {
      ctx = cnv.value.getContext('2d');

      setCnvBg(ctx);
    });

    // DRAW PATH
    getSocket().on('drawCoordinates', coordinates => {
      addPathCoordinates(coordinates);
    });

    watch(getPathCoordinates, current => {
      if (current.length > 1) {
        draw(ctx);
      }
    }, {
      deep: true,
      immediate: false,
    });

    resetCnvWatcher(getIsDrawing, ctx, resetPathCoordinates);

    return {
      cnv,
      cnvSize,
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
