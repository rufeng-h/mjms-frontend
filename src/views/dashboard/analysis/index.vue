<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
    <div class="md:flex enter-y">
      <DeptMeal class="md:w-1/3 w-full" :loading="loading" />
      <Distribution class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <AgeMeal class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import Distribution from '../../mjms/dashboard/components/Distribution.vue';
  import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import DeptMeal from '../../mjms/dashboard/components/DeptMeal.vue';
  import AgeMeal from '/@/views/mjms/dashboard/components/AgeMeal.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
