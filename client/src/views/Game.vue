<template>
  <main>
    <cnv-drawing v-if="getIsDrawing()" />
    <cnv-not-drawing v-else />
  </main>
</template>

<script>
import socketIO from 'socket.io-client';
import { onUnmounted, onMounted } from '@vue/composition-api';

import { deletePlayer, API_URL } from '@/api/API_URL';
import { setSocket, getSocket } from '@/store/socket';
import { setIsDrawing, getIsDrawing } from '@/store/drawingState';
import { getName } from '@/store/global';

import CnvDrawing from '@/components/canvas/CanvasDrawing.vue';
import CnvNotDrawing from '@/components/canvas/CanvasNotDrawing.vue';

export default {
  name: 'App',
  components: {
    CnvDrawing,
    CnvNotDrawing,
  },
  setup() {
    const io = socketIO.connect(API_URL);
    setSocket(io);

    getSocket().emit('preset', getName());

    io.on('setDrawer', isDrawing => {
      if (isDrawing && getIsDrawing()) return;

      if (isDrawing) {
        console.log('You are drawing');
        setIsDrawing(true);
        return;
      }

      setIsDrawing(false);
    });

    onMounted(() => {
      window.addEventListener('unload', clearStorage);
    });

    onUnmounted(() => {
      io.disconnect();

      window.removeEventListener('unload', clearStorage);
    });

    async function clearStorage() {
      sessionStorage.clear();
    }

    return {
      getIsDrawing,
    };
  },
};
</script>
