<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tab-change="onTabChange"
  >
    <div v-if="activeKey === 'meal'" class="flex flex-row justify-start items-center">
      <Statistic />
      <PredLine />
    </div>
    <p v-if="activeKey === 'flow'">
      <ManFlow />
    </p>
  </Card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import PredLine from '/@/views/mjms/dashboard/components/PredLine.vue';
  import ManFlow from '/@/views/mjms/dashboard/components/ManFlow.vue';
  import Statistic from '/@/views/mjms/dashboard/components/Statistic.vue';

  const activeKey = ref('meal');

  const tabListTitle = [
    {
      key: 'meal',
      tab: '就餐详情',
    },
    {
      key: 'flow',
      tab: '每10分钟流量',
    },
  ];

  function onTabChange(key) {
    activeKey.value = key;
  }
</script>
