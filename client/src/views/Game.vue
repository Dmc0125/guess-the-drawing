<template>
  <main class="dashboard-wrapper">
    <section
      class="dashboard"
      v-if="!isLoading"
      key="game-components"
    >
      <PlayersCard />
      <div class="canvas-wrapper">
        <CanvasDrawer
          v-if="getIsDrawing"
          key="drawer"
        />
        <CanvasGuesser
          v-else
          key="guesser"
        />
      </div>
    </section>
    <LoadingSpinner
      v-else
      key="loading"
    />
  </main>
</template>

<script>
import { onUnmounted, ref } from '@vue/composition-api';
import { useGetters, useActions } from '@u3u/vue-hooks';

import CanvasDrawer from '@/components/canvas/CanvasDrawer.vue';
import CanvasGuesser from '@/components/canvas/CanvasGuesser.vue';
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner.vue';
import PlayersCard from '@/components/players-card/PlayersCard.vue';

export default {
  components: {
    CanvasDrawer,
    CanvasGuesser,
    LoadingSpinner,
    PlayersCard,
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
.dashboard-wrapper
  width: 100%
  height: fit-content
  padding-top: 100px

  display: flex
  justify-content: center

.dashboard
  width: 100%
  height: 100%

  display: flex
  flex-direction: row
  align-content: center
  justify-content: center

.canvas-wrapper
  width: fit-content
  height: fit-content

@include mobile
  .canvas-wrapper
    height: 310px

@include tablet-small
  .canvas-wrapper
    height: 400px

@include tablet-large
  .canvas-wrapper
    height: 500px

@include desktop
  .canvas-wrapper
    height: 600px
</style>
