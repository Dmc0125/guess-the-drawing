<template>
  <div class="app">
    <vue-header />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import VueHeader from './components/header/Header.vue';

export default {
  name: 'App',
  components: {
    VueHeader,
  },
  setup() {
    document.title = 'Guess the drawing';
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

html,
body
  width: 100%
  height: 100%

body
  background-color: #0D0D0D;

.app
  width: 100%
  height: 100%
</style>
