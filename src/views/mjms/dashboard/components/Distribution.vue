<template>
  <Card :tab-list="tabList" :on-tab-change="tabChange">
    <div v-show="activeKey === 'dist'" ref="chartRef" :style="{ width, height }"></div>
    <div v-if="activeKey === 'detail'">
      <BasicTable @register="registerTable">
        <template #count="{ record }">
          <Icon icon="ooui:user-avatar-outline" size="18" />
          <CountTo :start-val="0" :end-val="record.count" class="text-2xl ml-1" />
        </template>
        <template #consume="{ record }">
          <CountTo :start-val="0" :end-val="record.consume" prefix="￥" class="text-2xl" />
        </template>
      </BasicTable>
    </div>
  </Card>
</template>

<script lang="ts">
  import { Card } from 'ant-design-vue';
  import { defineComponent, nextTick, onMounted, Ref, ref } from 'vue';
  import { mealDist } from '/@/api/mjms/meal';
  import { MealDistribution } from '/@/api/mjms/model/mealModel';
  import { CountTo } from '/@/components/CountTo';
  import Icon from '/@/components/Icon';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useECharts } from '/@/hooks/web/useECharts';

  const options = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} {d}%',
    },
    legend: {
      bottom: '1%',
      left: 'center',
    },
    series: [
      {
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
        name: '消费分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          // position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
            fontWeight: 'bold',
          },
        },
        data: [],
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay: function () {
          return Math.random() * 100;
        },
      },
    ],
  };

  const chartRef = ref<HTMLDivElement | null>(null);
  const tabList = [
    {
      tab: '消费分布',
      key: 'dist',
    },
    {
      tab: '数据详情',
      key: 'detail',
    },
  ];

  var dataSource: Nullable<MealDistribution[]> = null;

  export default defineComponent({
    components: { Card, BasicTable, CountTo, Icon },
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: '400px',
      },
    },
    setup() {
      const activeKey = ref('dist');
      function tabChange(key) {
        activeKey.value = key;
        if (key === 'dist') {
          setOptions(options);
        }
        if (key === 'detail') {
          nextTick(() => setTableData(dataSource ? dataSource : []));
        }
      }
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      const [registerTable, { setTableData }] = useTable({
        showIndexColumn: true,
        pagination: false,
        columns: [
          {
            dataIndex: 'type',
            title: '类型',
          },
          {
            dataIndex: 'count',
            title: '人次',
            slots: { customRender: 'count' },
          },
          {
            dataIndex: 'consume',
            title: '消费金额',
            slots: { customRender: 'consume' },
          },
        ],
        striped: true,
        canResize: false,
      });

      onMounted(async () => {
        dataSource = (await mealDist('2023-01-19')).sort((a, b) => b.count - a.count);
        options.series[0].data = dataSource?.map((d) => {
          return {
            name: d.type,
            value: d.count,
          };
        });
        setOptions(options);
        // activeKey.value === 'detail' && setTableData(dataSource);
      });
      return {
        chartRef,
        tabList,
        tabChange,
        activeKey,
        registerTable,
      };
    },
  });
</script>
