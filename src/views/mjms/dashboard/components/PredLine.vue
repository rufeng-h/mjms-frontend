<template>
  <div class="absolute top-4 right-8">
    <Tag
      @click="mealChange('breakfast')"
      color="green"
      class="mr-2 !text-sm"
      :class="{ 'meal-active': mealState[0] }"
      ><span>早</span
      ><Icon icon="fluent-mdl2:breakfast" color="#5ab1ef" :size="mealState[0] ? 22 : 18"
    /></Tag>
    <Tag
      @click="mealChange('lunch')"
      color="orange"
      class="mr-2 !text-sm"
      :class="{ 'meal-active': mealState[1] }"
      ><span>中</span><Icon icon="ic:outline-lunch-dining" :size="mealState[1] ? 22 : 18"
    /></Tag>
    <Tag
      @click="mealChange('dinner')"
      color="blue"
      class="!text-sm"
      :class="{ 'meal-active': mealState[2] }"
      ><span>晚</span><Icon icon="ic:baseline-dinner-dining" :size="mealState[2] ? 22 : 18"
    /></Tag>
  </div>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>
<script lang="ts">
  import { Tag } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import { EChartsOption } from 'echarts';
  import { defineComponent, onMounted, ref, Ref } from 'vue';
  import { listDining } from '/@/api/mjms/dining';
  import { Dining } from '/@/api/mjms/model/diningModel';
  import Icon from '/@/components/Icon';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { DATE_FORMAT, isWorkday } from '/@/utils/dateUtil';

  async function fetch() {
    var cnt = 0;
    const dates: string[] = [];
    var date = dayjs('2023-01-19', DATE_FORMAT);
    while (cnt < 45) {
      const date_str = date.format(DATE_FORMAT);
      if (isWorkday(date_str)) {
        cnt += 1;
        dates.push(date_str);
      }
      date = date.add(-1, 'day');
    }

    return listDining(dates);
  }

  const options: EChartsOption = {
    // title: {
    //   text: '预测曲线',
    //   textStyle: {
    //     fontWeight: 'normal',
    //     fontSize: '16px',
    //   },
    //   top: '0',
    //   left: '5%',
    // },
    legend: {},
    dataZoom: { type: 'inside', minValueSpan: 30, show: false },
    tooltip: {
      // formatter(params) {
      //   const err =
      //     ((Math.abs(params[0].data - params[1].data) / params[0].data) * 100).toFixed(2) + '%';
      //   return `${params[0].name} ${dinings[params[0].dataIndex].remark}<br>真实值：${
      //     params[0].data
      //   }<br>预测值：${params[1].data}<br>门禁值：${params[2].data}<br>预测误差：${err}`;
      // },
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 1,
          color: '#019680',
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'solid',
          color: 'rgba(226,226,226,0.5)',
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        type: 'value',
        splitNumber: 4,
        axisTick: {
          show: false,
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
          },
        },
      },
    ],
    grid: { left: '1%', right: '1%', top: '10%', bottom: 0, containLabel: true },
    series: [
      {
        name: '真实值',
        smooth: true,
        data: [],
        type: 'line',
        // areaStyle: {},
        itemStyle: {
          color: '#5ab1ef',
        },
      },
      {
        name: '预测值',
        smooth: true,
        data: [],
        type: 'line',
        // areaStyle: {},
        itemStyle: {
          color: '#019680',
        },
      },
      {
        name: '门禁值',
        smooth: true,
        data: [],
        type: 'line',
        // areaStyle: {},
        itemStyle: {
          color: '#7823dd',
        },
      },
    ],
  };

  var dinings: Nullable<Dining[]> = null;

  const chartRef = ref<HTMLDivElement | null>(null);

  export default defineComponent({
    components: {
      Icon,
      Tag,
    },
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: '280px',
      },
    },

    setup() {
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

      const mealState = ref([true, false, false]);
      function mealChange(meal: string) {
        if (meal === 'breakfast') {
          mealState.value[0] = true;
          mealState.value[1] = false;
          mealState.value[2] = false;
          options.series[0].data = dinings.map((d) => d.realBreakfast);
          options.series[1].data = dinings.map((d) => d.predBreakfast);
          options.series[2].data = dinings.map((d) => d.amsBreakfast);
          setOptions(options);
        } else if (meal === 'lunch') {
          mealState.value[0] = false;
          mealState.value[1] = true;
          mealState.value[2] = false;
          options.series[0].data = dinings.map((d) => d.realLunch);
          options.series[1].data = dinings.map((d) => d.predLunch);
          options.series[2].data = dinings.map((d) => d.amsLunch);
          setOptions(options);
        } else {
          mealState.value[0] = false;
          mealState.value[1] = false;
          mealState.value[2] = true;
          options.series[0].data = dinings.map((d) => d.realDinner);
          options.series[1].data = dinings.map((d) => d.predDinner);
          options.series[2].data = dinings.map((d) => d.amsDinner);
          setOptions(options);
        }
      }

      onMounted(async () => {
        if (dinings === null) {
          dinings = await fetch();
        }
        /* @ts-ignore */
        options.xAxis.data = dinings.map((d) => d.dnDate);
        options.series[0].data = dinings.map((d) => d.realBreakfast);
        options.series[1].data = dinings.map((d) => d.predBreakfast);
        options.series[2].data = dinings.map((d) => d.amsBreakfast);

        setOptions(options);
      });

      return {
        chartRef,

        mealChange,
        mealState,
      };
    },
  });
</script>

<style scoped lang="less">
  .meal-active {
    font-size: 1.4em !important;
    border: 1px solid;
    box-shadow: 5px 5px 5px #888888;
  }
</style>
