<template>
  <form @submit.prevent="submitName">
    <input type="text" v-model="name" placeholder="Name">
    <button type="submit">Play</button>
  </form>
</template>

<script>
import { ref } from '@vue/composition-api';

import { logIn } from '@/api/API_URL';
import { isValid } from '@/helpers/validateName';
import { setName } from '@/store/global';

export default {
  name: 'App',
  setup(_, { root }) {
    const name = ref('');

    async function submitName() {
      if (!isValid(name.value)) {
        console.log('Username is not valid');
        return;
      }

      try {
        await logIn(name.value);

        setName(name.value);
        sessionStorage.setItem('name', name.value);
        root.$router.push({ path: '/game' });
      } catch (error) {
        console.log(error);
      }
    }

    return {
      name,
      submitName,
    };
  },
};
</script>

<style lang="sass" scoped>
form
  width: 100%
  margin-top: 150px

  display: flex
  align-items: center
  justify-content: center

input
  width: 300px
  height: 2.5rem
  padding: 1rem

  background: #162736
  color: #fff
  font-size: 1rem
  border-radius: 5px

  &::placeholder
    font-size: 1rem
    color: #708594
    opacity: 1

button
  width: 100px
  height: 2.5rem
  margin-left: 1rem
  padding: 1rem

  background: #162736
  border: 1px solid #708594
  border-radius: 5px
  color: #708594
  font-size: 1rem
  cursor: pointer

  display: flex
  align-items: center
  justify-content: center

  &:hover
    background: #708594
    color: #162736
</style>
