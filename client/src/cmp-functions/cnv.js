import { reactive, watch } from '@vue/composition-api';

const useCnv = () => {
  const cnvSize = reactive({
    width: `${window.innerWidth / 2}px`,
    height: `${window.innerHeight / 2}px`,
  });

  window.addEventListener('resize', () => {
    cnvSize.width = `${window.innerWidth / 2}px`;
    cnvSize.height = `${window.innerHeight / 2}px`;
  });

  const removeResizeListener = () => {
    window.removeEventListener('resize', () => {
      cnvSize.width = `${window.innerWidth / 2}px`;
      cnvSize.height = `${window.innerHeight / 2}px`;
    });
  };

  const resetCnv = ctx => {
    const { width: w, height: h } = cnvSize;

    ctx
      .clearRect(0, 0, Number(w.substring(0, w.length - 2)), Number(h.substring(0, h.length - 2)));
  };

  const resetCnvWatcher = (watched, ctx, cb) => {
    watch(() => watched(), () => {
      if (ctx) {
        resetCnv(ctx);
        cb();
      }
    });
  };

  const setCnvBg = (ctx, color = '#fff') => {
    const { width: w, height: h } = cnvSize;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, Number(w.substring(0, w.length - 2)), Number(h.substring(0, h.length - 2)));
  };

  return {
    cnvSize,
    removeResizeListener,
    resetCnvWatcher,
    setCnvBg,
  };
};

export default useCnv;
