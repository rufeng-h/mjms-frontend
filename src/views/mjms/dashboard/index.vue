<template>
  <div> <Statistic /><ManFlow /></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Statistic from './components/Statistic.vue';
  import PredLine from './components/PredLine.vue';
  import Distribution from './components/Distribution.vue';
  import ManFlow from './components/ManFlow.vue';

  export default defineComponent({
    components: {
      Statistic,
      PredLine,
      Distribution,
      ManFlow,
    },
    setup() {},
  });
</script>
