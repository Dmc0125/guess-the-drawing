<template>
  <canvas
    ref="cnvElement"
    :width="`${size.width}px`"
    :height="`${size.height}px`"
    @mousedown="mouseDownListener"
    @mouseup="mouseUpListener"
    @mousemove="mouseMoveListener"
    @mouseout="mouseOutListener"
  ></canvas>
</template>

<script>
import {
  ref, reactive, onMounted, onUnmounted, watch,
} from '@vue/composition-api';
import { useActions } from '@u3u/vue-hooks';

export default {
  props: {
    mouseDownListener: {
      type: Function,
      default: () => {},
    },
    mouseUpListener: {
      type: Function,
      default: () => {},
    },
    mouseMoveListener: {
      type: Function,
      default: () => {},
    },
    mouseOutListener: {
      type: Function,
      default: () => {},
    },
  },
  setup(_, context) {
    const actions = useActions(['setCanvasCtx', 'setCanvasSize', 'resetPathCoordinates', 'redraw']);

    const cnvElement = ref(null);
    const size = reactive({
      width: '600',
      height: '600',
    });

    let ctx;

    onMounted(() => {
      ctx = cnvElement.value.getContext('2d');

      setCnvSize();
      setCnvBg();

      actions.setCanvasCtx(ctx);
      // TODO:
      // Draw what is drawn already when new player joins
      actions.redraw();

      window.addEventListener('resize', resize);
    });

    watch(() => size, () => {
      actions.setCanvasSize(size);

      if (ctx) {
        setCnvBg();
      }
    }, {
      deep: true,
    });

    onUnmounted(() => {
      actions.resetPathCoordinates();
      window.removeEventListener('resize', resize);
    });

    function resize() {
      setCnvSize();
      setCnvBg();
      actions.setCanvasCtx(ctx);

      context.emit('canvas-resize');
    }

    function setCnvSize() {
      const w = window.innerWidth;
      let cnvSize;

      if (w >= 1280) {
        cnvSize = 600;
      } else if (w >= 768) {
        cnvSize = 500;
      } else if (w >= 460) {
        cnvSize = 400;
      } else {
        cnvSize = 310;
      }

      size.width = cnvSize;
      size.height = cnvSize;
    }

    function setCnvBg(color = '#fff') {
      const { width, height } = size;

      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
    }

    return {
      cnvElement,
      size,
    };
  },
};
</script>

<style>

</style>
