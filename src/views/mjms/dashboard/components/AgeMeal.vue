<template>
  <Card title="年龄分布" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { onMounted, Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { ageMeal } from '/@/api/mjms/meal';

  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  const options = {
    tooltip: {
      trigger: 'item',
    },
    legend: { bottom: '2%' },
    series: [
      {
        name: '年龄分布',
        type: 'pie',
        radius: '70%',
        center: ['50%', '45%'],
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
        data: [],
        // roseType: 'radius',
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay: function () {
          return Math.random() * 400;
        },
        label: {
          formatter: '{b}: {d}%',
        },
      },
    ],
  };

  onMounted(async () => {
    const dataSource = await ageMeal('2023-01-19');
    options.series[0].data = dataSource
      .map((m) => {
        return {
          name: m.ageInterval + '岁',
          value: m.count,
        };
      })
      .sort((a, b) => a.value - b.value);
  });

  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      setOptions(options);
    },
    { immediate: true },
  );
</script>
