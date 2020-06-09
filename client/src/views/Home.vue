<template>
  <section class="login">
    <form
      v-if="!isLoading"
      @submit.prevent="submitName"
    >
      <input
        type="text"
        placeholder="Name"
        v-model="name"
      >
      <button type="submit">Play</button>
    </form>
    <LoadingSpinner v-else />
  </section>
</template>

<script>
import { ref, onUnmounted } from '@vue/composition-api';
import { useActions, useGetters, useRouter } from '@u3u/vue-hooks';
import io from 'socket.io-client';

import { logIn, updatePlayerID, API_URL } from '@/api/API';
import { isValid } from '@/helpers/validateName';
import { setItemToStorage } from '@/helpers/sessionStorage';

import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner,
  },
  setup() {
    const { router } = useRouter();
    const getters = useGetters(['getSocket', 'getPlayers']);
    const actions = useActions(['setName', 'setSocket', 'setPlayers', 'setPathCoordinates']);

    const isLoading = ref(false);
    const name = ref('');

    async function submitName() {
      if (!isValid(name.value)) {
        console.log('Username is not valid');
        return;
      }

      try {
        isLoading.value = true;

        await logIn(name.value);
        actions.setName(name.value);
        setItemToStorage('name', name.value);

        const socket = io(API_URL);
        actions.setSocket(socket);

        socket.on('connect', async () => {
          try {
            await updatePlayerID(name.value, socket.id);
          } catch (err) {
            console.log(err);
          }
        });

        socket.on('game-start', startGame);
      } catch (error) {
        console.log(error);
        isLoading.value = false;
      }
    }

    function startGame(players) {
      actions.setPlayers(players);

      // if (pathCoordinates && Array.isArray(pathCoordinates)) {
      //   actions.setPathCoordinates(pathCoordinates);
      // }

      console.log(getters.getPlayers.value);

      isLoading.value = false;
      router.push({ path: '/game' });
    }

    onUnmounted(() => {
      if (getters.getSocket.value) {
        getters.getSocket.value.off('game-start', startGame);
      }
    });

    return {
      name,
      isLoading,
      submitName,
    };
  },
};
</script>

<style lang="sass" scoped>
.login
  width: 100%
  height: 100%
  padding-top: 100px

  display: flex
  justify-content: center

form
  display: flex

input
  width: 300px
  height: 2.5rem
  padding: 1rem

  background: $primary-darker
  color: $font-light
  font-size: 1rem
  border-radius: 5px

  &::placeholder
    font-size: 1rem
    color: $font-light
    opacity: 1

button
  width: 100px
  height: 2.5rem
  margin-left: 1rem
  padding: 1rem

  background: none
  border: 2px solid $red
  border-radius: 5px
  color: $red
  font-size: 1rem
  font-weight: 500
  cursor: pointer
  transition: all 200ms ease-in-out

  display: flex
  align-items: center
  justify-content: center

  &:hover
    background: $red
    color: $primary
</style>
