<template>
  <main class="dashboard">
    <section v-if="!isLoading">
      <canvas-drawer v-if="getIsDrawing" />
      <canvas-guesser v-else />
    </section>
    <loading-spinner v-else></loading-spinner>
  </main>
</template>

<script>
import { onUnmounted, ref } from '@vue/composition-api';
import { useGetters, useActions } from '@u3u/vue-hooks';

import CanvasDrawer from '@/components/canvas/CanvasDrawer.vue';
import CanvasGuesser from '@/components/canvas/CanvasGuesser.vue';
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner.vue';

export default {
  components: {
    CanvasDrawer,
    CanvasGuesser,
    LoadingSpinner,
  },
  setup() {
    const getters = useGetters(['getSocket', 'getIsDrawing']);
    const actions = useActions(['setIsDrawing', 'setPlayers']);

    const isLoading = ref(false);

    getters.getSocket.value.on('game-start', players => {
      actions.setPlayers(players);
      isLoading.value = false;
    });

    getters.getSocket.value.on('set-drawer', words => {
      actions.setIsDrawing(true);

      console.log('Im drawing');
      console.log(words);
    });

    getters.getSocket.value.on('player-disconnected', ({ notEnoughPlayers, players }) => {
      if (notEnoughPlayers) {
        isLoading.value = true;
      }

      actions.setPlayers(players);
    });

    onUnmounted(() => {
      getters.getSocket.value.disconnect();
    });

    return {
      getIsDrawing: getters.getIsDrawing,
      isLoading,
    };
  },
};
</script>

<style lang="sass" scoped>
.dashboard
  width: 100%
  height: 100%
  padding-top: 100px

  display: flex
  justify-content: center
</style>
