<template>
  <div class="absolute top-3 right-3 flex flex-row justify-center items-center">
    <Tag :color="showWorkday ? 'orange' : 'green'" class="!text-base">
      <span> {{ showWorkday ? '工作日' : '休息日' }}</span>
      <template #icon>
        <Icon
          size="20"
          :icon="showWorkday ? 'ic:outline-work-history' : 'icon-park-solid:resting'"
        />
      </template>
    </Tag>

    <a-date-picker
      :disabledDate="disabledDate"
      @change="handleChange"
      :value="curDate"
      :allow-clear="false"
    />
  </div>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { Tag, DatePicker } from 'ant-design-vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { computed, defineComponent, onMounted, reactive, ref, Ref, toRefs } from 'vue';
  import { getFlow } from '/@/api/mjms/manFlow';
  import Icon from '/@/components/Icon';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { DATE_FORMAT, isWorkday } from '/@/utils/dateUtil';
  const option = {
    dataZoom: { type: 'inside', show: false, minValueSpan: 20 },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 1,
          color: '#019680',
        },
      },
    },
    grid: { left: '1%', right: '1%', top: '2%', bottom: 0, containLabel: true },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
      splitNumber: 4,
    },
    series: [
      {
        data: [],
        type: 'bar',
        barCategoryGap: '0',
        // barMaxWidth: 80,
        itemStyle: {},
      },
      {
        tooltip: {
          show: false,
        },
        type: 'line',
        data: [],
        smooth: true,
        itemStyle: { normal: { label: { show: true } } },
        lineStyle: { color: '#2296aa' },

        // areaStyle: {
        //   color: 'rgba(22, 96, 170, 0.8)',
        // },
      },
    ],
  };
  const state = reactive({
    curDate: dayjs(),
  });

  const disabledDate = (date: Dayjs) => {
    const today = dayjs();
    return today.isBefore(date) || date.isBefore(dayjs('2022-11-03', DATE_FORMAT));
  };
  const showWorkday = computed(() => {
    return isWorkday(state.curDate.format(DATE_FORMAT));
  });

  export default defineComponent({
    components: {
      Tag,
      Icon,
      [DatePicker.name]: DatePicker,
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
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      const drawChart = async (date: Dayjs) => {
        const flow = await getFlow(date.format(DATE_FORMAT));
        const values = JSON.parse(flow.pred);
        option.series[0].data = Object.values(values);
        option.series[1].data = Object.values(values).map((i: number) => {
          return i;
        });
        option.xAxis.data = Object.keys(values);
        setOptions(option);
      };
      const handleChange = async (date: Dayjs) => {
        state.curDate = date;
        drawChart(date);
      };
      onMounted(async () => {
        await drawChart(state.curDate);
      });
      return {
        chartRef,
        showWorkday,
        disabledDate,
        handleChange,
        ...toRefs(state),
      };
    },
  });
</script>
