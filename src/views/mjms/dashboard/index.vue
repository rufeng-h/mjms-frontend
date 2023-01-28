<template>
  <!-- <div> <Statistic /></div> -->
  <div> <Distribution /></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Statistic from './components/Statistic.vue';
  import PredLine from './components/PredLine.vue';
  import Distribution from './components/Distribution.vue';

  export default defineComponent({
    components: {
      Statistic,
      PredLine,
      Distribution,
    },
    setup() {},
  });
</script>
