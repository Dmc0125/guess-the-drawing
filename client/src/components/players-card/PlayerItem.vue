<template>
  <div
    class="player-item"
    :class="{ 'guessed-right': guessedRight }"
  >
    <div
      class="player-info"
      :class="{ 'drawer': isDrawer }"
    >
      <span class="player-info-wrapper">
        <h4 class="player-name">{{ playerName }}</h4>
        <DrawerIcon v-if="isDrawer" />
      </span>

      <div class="player-points">
        <span>{{ playerPoints }}</span>
        points
      </div>
    </div>
    <div class="divider"></div>
    <div
      class="user-highlighter"
      v-if="isCurrentPlayer"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import DrawerIcon from '@/components/icons/DrawerIcon.vue';

export default {
  components: {
    DrawerIcon,
  },
  props: {
    playerName: {
      type: String,
      required: true,
    },
    playerPoints: {
      type: Number,
      required: true,
    },
    isDrawer: {
      type: Boolean,
      required: true,
    },
    guessedRight: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isCurrentPlayer() {
      return this.getName === this.playerName;
    },
    ...mapGetters(['getName']),
  },
};
</script>

<style lang="sass" scoped>
.player-item
  position: relative

.player-info
  padding: 1.5rem 2rem

  display: flex
  justify-content: space-between

.player-info-wrapper
  display: flex
  align-items: center

.player-name
  margin-right: 1rem

  font-size: 1.1rem
  font-weight: 500

.player-points
  font-size: 1.1rem
  span
    font-weight: 500

.divider
  width: 90%
  height: 1px
  margin: 0 auto

  background: opacify($primary, 0.1)

.current-player
  color: $blue

.user-highlighter
  width: 5px
  height: 50%
  transform: translateY(-50%)
  top: 50%
  left: 0
  position: absolute

  background: $blue

// DYNAMIC

.guessed-right
  background: $green
  background: linear-gradient(90deg, rgba(45,55,72,0) 0%, rgba(39,174,96,1) 100%)

.drawer
  color: $orange
</style>
