<template>
  <aside v-if="getMessage()"></aside>
</template>

<script>
import { getMessage, resetMessage } from '@/store/error';
import { watch } from '@vue/composition-api';

export default {
  setup() {
    watch(getMessage, () => {
      setTimeout(() => {
        resetMessage();
      }, 3000);
    });

    return {
      getMessage,
      resetMessage,
    };
  },
};
</script>

<style>

</style>
