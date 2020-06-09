<template>
  <section class="players-card">
    <PlayerItem
      v-for="{ name, points, isDrawer, socketId } in getPlayers"
      :key="socketId"
      :player-name="name"
      :player-points="points"
      :is-drawer="isDrawer"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import PlayerItem from '@/components/players-card/PlayerItem.vue';

export default {
  components: {
    PlayerItem,
  },
  computed: {
    ...mapGetters(['getPlayers']),
  },
};
</script>

<style lang="sass" scoped>
.players-card
  width: 400px
  height: 600px

  background: $primary-lighter
  border-radius: 10px
  box-shadow: 0 3px 10px rgba(0, 0, 0, .2)
</style>
