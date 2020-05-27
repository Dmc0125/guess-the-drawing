<template>
  <div>
    <canvas
      ref="cnv"
      :width="cnvSize.width"
      :height="cnvSize.height"
      @mousemove="onMouseMove"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    ></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api';

import { emitEvent } from '@/store/socket';
import {
  addPathCoordinates, draw, getIsDrawing, resetPathCoordinates,
} from '@/store/drawingState';
import useCnv from '@/cmp-functions/cnv';

export default {
  setup() {
    const { cnvSize, resetCnvWatcher, setCnvBg } = useCnv();

    const cnv = ref(null);
    let ctx;

    onMounted(() => {
      ctx = cnv.value.getContext('2d');

      setCnvBg(ctx);
    });

    let mouseDown = false;

    function onMouseMove(e) {
      if (mouseDown) {
        const pos = {
          x: e.layerX,
          y: e.layerY,
          rect: false,
        };

        addPathCoordinates(pos);
        emitEvent.draw(pos);

        draw(ctx);
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

      addPathCoordinates(pos);
      emitEvent.draw(pos);

      draw(ctx);
    }

    resetCnvWatcher(getIsDrawing, ctx, resetPathCoordinates);

    return {
      cnv,
      cnvSize,
      onMouseMove,
      onMouseDown,
      onMouseUp,
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
