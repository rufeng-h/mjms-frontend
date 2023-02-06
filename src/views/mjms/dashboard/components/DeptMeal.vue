<template>
  <Card
    :loading="loading"
    :tab-list="tabList"
    :active-tab-key="activeKey"
    :on-tab-change="tabChange"
  >
    <div v-show="activeKey === 'dept'" ref="chartRef" :style="{ width, height }"></div>
    <div v-if="activeKey === 'detail'">
      <BasicTable @register="registerTable">
        <template #count="{ record }">
          <Icon icon="noto:curry-rice" size="18" />
          <CountTo :start-val="0" :end-val="record.count" class="text-xl ml-1" />
        </template>
        <template #consume="{ record }">
          <Icon icon="ooui:user-avatar-outline" size="18" color="#5ab1ef" />
          <CountTo :start-val="0" :end-val="record.total" class="text-xl ml-1" />
        </template>
      </BasicTable>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { nextTick, onMounted, Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { deptMeal } from '/@/api/mjms/meal';
  import { DeptMeal } from '/@/api/mjms/model/mealModel';
  import { useTable, BasicTable } from '/@/components/Table';
  import { CountTo } from '/@/components/CountTo';
  import { Icon } from '/@/components/Icon';

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
        name: '部门分布',
        type: 'pie',
        radius: '70%',
        center: ['50%', '45%'],
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
        data: [],
        roseType: 'radius',
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
  const activeKey = ref('dept');
  const tabList = [
    {
      tab: '部门分布',
      key: 'dept',
    },
    {
      tab: '数据详情',
      key: 'detail',
    },
  ];
  var dataSource: Nullable<DeptMeal[]> = null;
  function tabChange(key) {
    activeKey.value = key;
    if (key === 'dept') {
      setOptions(options);
    }
    if (key === 'detail') {
      nextTick(() => setTableData(dataSource ? dataSource : []));
    }
  }

  const [registerTable, { setTableData }] = useTable({
    showIndexColumn: true,
    pagination: false,
    columns: [
      {
        dataIndex: 'dept',
        title: '部门',
      },
      {
        dataIndex: 'count',
        title: '今日就餐',
        slots: { customRender: 'count' },
      },
      {
        dataIndex: 'total',
        title: '总人数',
        slots: { customRender: 'consume' },
      },
    ],
    striped: true,
    canResize: true,
  });

  onMounted(async () => {
    dataSource = (await deptMeal('2023-01-19')).sort((a, b) => b.count - a.count);
    options.series[0].data = dataSource
      ?.map((m) => {
        return {
          name: m.dept,
          value: m.count,
        };
      })

      .slice(0, 5);
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
