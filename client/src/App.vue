<template>
  <div class="app">
    <vue-header />
    <main class="app-wrapper">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from '@vue/composition-api';
import { useGetters } from '@u3u/vue-hooks';

import { clearStorage } from '@/helpers/sessionStorage';

import VueHeader from './components/header/Header.vue';

export default {
  components: {
    VueHeader,
  },
  setup() {
    document.title = 'Guess the drawing';

    const { getSocket } = useGetters(['getSocket']);

    onMounted(() => {
      window.addEventListener('unload', clearStorage);
    });

    onUnmounted(() => {
      getSocket.value.disconnect();

      window.removeEventListener('unload', clearStorage);
    });
  },
};
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  border: 0
  box-sizing: border-box

  font-family: 'Rubik', sans-serif
  color: $font-light

html,
body
  width: 100%
  height: 100%

body
  background-color: $primary

.app
  width: 100%
  height: 100%

  .app-wrapper
    width: 100%
    height: calc(100% - 140px)
</style>
