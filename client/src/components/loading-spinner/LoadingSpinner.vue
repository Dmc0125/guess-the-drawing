<template>
  <section>
    <p>Searching for other players{{ dots }}</p>
    <div class="loading-spinner-container">
      <div class="loading-spinner"></div>
    </div>
  </section>
</template>

<script>
import { ref, onUnmounted } from '@vue/composition-api';

export default {
  setup() {
    const dotsPhases = ['.', '..', '...'];
    const dots = ref(dotsPhases[0]);

    let i = 0;

    const timer = setInterval(() => {
      dots.value = dotsPhases[i];

      if (i === 2) {
        i = 0;
        return;
      }

      i++;
    }, 1000);

    onUnmounted(() => {
      clearInterval(timer);
    });

    return {
      dots,
    };
  },
};
</script>

<style lang="sass" scoped>
$size: 160px
$animation-length: 1.5s

section
  width: fit-content
  height: fit-content

p
  font-size: 1.5rem

.loading-spinner-container
  width: $size
  height: $size
  margin: 2.5rem auto 0

.loading-spinner
  width: 100%
  height: 100%

  border: 0.5rem solid $primary-darker
  border-bottom-color: $red
  border-radius: 50%

  animation: rotate $animation-length infinite linear

@keyframes rotate
  from
    transform: rotate(0)
  to
    transform: rotate(360deg)
</style>
