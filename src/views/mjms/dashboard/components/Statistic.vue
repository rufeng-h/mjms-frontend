<template>
  <a-card class="w-full !md:w-1/4" title="就餐和门禁" hoverable>
    <!-- 标题 -->
    <!-- <template #title>
      <BasicTitle helpMessage="帮助信息">统计信息</BasicTitle>
    </template> -->
    <!-- 右上角时间选择 -->
    <template #extra>
      <div class="flex flex-row justify-center items-center">
        <a-tag :color="showWorkday ? 'orange' : 'green'">
          <span> {{ showWorkday ? '工作日' : '休息日' }}</span>
          <template #icon>
            <Icon :icon="showWorkday ? 'ic:outline-work-history' : 'icon-park-solid:resting'" />
          </template>
        </a-tag>

        <a-date-picker
          :disabledDate="disabledDate"
          @change="handleChange"
          :value="curDate"
          :allow-clear="false"
        />
      </div>
    </template>

    <BasicTable @register="regTable">
      <template #time="{ record }">
        <Icon :icon="record.time.icon" />
        <span class="ml-2">{{ record.time.value }}</span>
      </template>
      <template #pred="{ record }">
        <CountTo :startVal="0" :endVal="record.pred.value" class="text-2xl" />
        <span v-if="record.pred.error !== undefined" class="text-orange-600 ml-1">
          {{ (100 * record.pred.error).toFixed(2) + '%' }}
        </span>
      </template>
      <template #real="{ record }">
        <CountTo :startVal="0" :endVal="record.real.value" class="text-2xl" />
        <span
          v-if="record.real.error !== undefined"
          class="ml-1"
          :class="{
            'text-rose-600': record.real.error < 0,
            'text-green-600': record.real.error >= 0,
          }"
        >
          <Icon
            :color="record.real.error > 0 ? 'green' : 'red'"
            size="13"
            :icon="
              record.real.error > 0
                ? 'material-symbols:arrow-upward'
                : 'material-symbols:arrow-downward'
            "
          />
          {{ Math.abs(100 * record.real.error).toFixed(2) + '%' }}
        </span>
      </template>
      <template #ams="{ record }">
        <CountTo :startVal="0" :endVal="record.ams.value" class="text-2xl" />
        <span v-if="record.ams.error !== undefined" class="ml-1 text-purple-600">
          {{ '/ ' + record.ams.error }}
        </span>
      </template>
    </BasicTable>
  </a-card>
</template>

<script lang="ts">
  import { Card, DatePicker, Tag } from 'ant-design-vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { computed, defineComponent, onBeforeMount, reactive, toRefs } from 'vue';
  import { listDining } from '/@/api/mjms/dining';
  import { Dining, getEmptyDn } from '/@/api/mjms/model/diningModel';
  import { CountTo } from '/@/components/CountTo';
  import Icon from '/@/components/Icon';
  import { BasicColumn, BasicTable, useTable } from '/@/components/Table';
  import { isHoliday, isWorkday } from '/@/utils/dateUtil';
  interface State {
    dn: Dining;
    prevDn: Dining;
    curDate: Dayjs;
  }

  const columns: BasicColumn[] = [
    {
      dataIndex: 'time',
      title: '时间',
      width: 60,
      slots: { customRender: 'time' },
    },
    {
      dataIndex: 'pred',
      title: '预计',
      width: 120,
      slots: { customRender: 'pred' },
    },
    {
      title: '实际',
      width: 140,
      dataIndex: 'real',
      slots: { customRender: 'real' },
    },
    {
      dataIndex: 'ams',
      width: 120,
      title: '门禁',
      slots: { customRender: 'ams' },
    },
  ];

  function initState() {
    return {
      dn: getEmptyDn(),
      prevDn: getEmptyDn(),
      curDate: dayjs(),
    };
  }

  const [regTable, { setTableData }] = useTable({
    pagination: false,
    columns,
    showIndexColumn: false,
    canResize: false,
    striped: false,
    bordered: true,
  });

  const DATE_FMT = 'YYYY-MM-DD';

  const disabledDate = (date: Dayjs) => {
    const today = dayjs();
    return today.isBefore(date) || date.isBefore(dayjs('2022-11-03', DATE_FMT));
  };
  const showWorkday = computed(() => {
    return isWorkday(state.curDate.format(DATE_FMT));
  });

  const fetchDn = async (date: Dayjs) => {
    const target = isHoliday(date.format(DATE_FMT)) ? isWorkday : isHoliday;
    var prevday = date.add(-1, 'day');
    while (target(prevday.format(DATE_FMT))) {
      prevday = prevday.add(-1, 'day');
    }
    const dns = await listDining([date.format(DATE_FMT), prevday.format(DATE_FMT)]);
    const [prevDn, dn] = dns;

    // 早上
    const tableData = [
      {
        time: { icon: 'fluent-mdl2:breakfast', value: '早' },
        pred: {
          value: dn.predBreakfast,
          error: !!dn.realBreakfast
            ? Math.abs(dn.realBreakfast - dn.predBreakfast) / dn.realBreakfast
            : undefined,
        },
        real: {
          value: dn.realBreakfast,
          error: !!dn.realBreakfast
            ? (dn.realBreakfast - prevDn.realBreakfast) / prevDn.realBreakfast
            : undefined,
        },
        ams: {
          value: dn.amsBreakfast,
          error: !!dn.amsBreakfast ? Math.abs(dn.realBreakfast - dn.amsBreakfast) : undefined,
        },
      },
      {
        time: { icon: 'ic:outline-lunch-dining', value: '中' },
        pred: {
          value: dn.predLunch,
          error: !!dn.realLunch ? Math.abs(dn.realLunch - dn.predLunch) / dn.realLunch : undefined,
        },
        real: {
          value: dn.realLunch,
          error: !!dn.realLunch ? (dn.realLunch - prevDn.realLunch) / prevDn.realLunch : undefined,
        },
        ams: {
          value: dn.amsLunch,
          error: !!dn.amsLunch ? Math.abs(dn.realLunch - dn.amsLunch) : undefined,
        },
      },
      {
        time: { icon: 'ic:baseline-dinner-dining', value: '晚' },
        pred: {
          value: dn.predDinner,
          error: !!dn.realDinner
            ? Math.abs(dn.realDinner - dn.predDinner) / dn.realDinner
            : undefined,
        },
        real: {
          value: dn.realDinner,
          error: !!dn.realDinner
            ? (dn.realDinner - prevDn.realDinner) / prevDn.realDinner
            : undefined,
        },
        ams: {
          value: dn.amsDinner,
          error: !!dn.amsDinner ? Math.abs(dn.realDinner - dn.amsDinner) : undefined,
        },
      },
    ];
    setTableData(tableData);
  };

  async function handleChange(date: Dayjs) {
    state.curDate = date;
    fetchDn(date);
  }

  const state: State = reactive(initState());

  export default defineComponent({
    components: {
      [Tag.name]: Tag,
      Icon,
      CountTo,
      [DatePicker.name]: DatePicker,
      [Card.name]: Card,
      BasicTable,
    },
    setup() {
      onBeforeMount(async () => {
        fetchDn(dayjs());
      });

      return {
        ...toRefs(state),
        showWorkday,
        regTable,
        disabledDate,
        handleChange,
      };
    },
  });
</script>
<style lang="less" scoped>
  :deep(.ant-card-body) {
    padding: 4px;
  }

  :deep(.ant-card-head) {
    padding: 0.5rem;
  }

  :deep(.ant-card-extra) {
    padding: 0;
  }

  :deep(.ant-card-head-title) {
    padding: 0.5rem;
  }
</style>
