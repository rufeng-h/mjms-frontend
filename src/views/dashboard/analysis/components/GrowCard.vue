<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0"
        :class="{ '!md:mr-4': index + 1 < 4, '!mt-4': index > 0 }"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <div
            ><Icon :icon="item.numIcon" size="30" :color="item.iconColor" />
            <CountTo :startVal="1" :endVal="item.value" class="text-2xl ml-2"
          /></div>

          <Icon :icon="item.icon" :color="item.color" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between items-center text-base">
          <span>{{ item.bottomTitle }}</span>
          <div
            ><Icon :icon="item.numIcon" size="20" :color="item.iconColor" />
            <CountTo :startVal="1" :endVal="item.total" class="ml-2"
          /></div>
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';
  import { Tag, Card } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import { siteStatistic } from '/@/api/mjms/meal';
  const growCardList = ref([
    {
      title: '今日预计就餐',
      icon: 'noto-v1:curry-rice',
      value: 0,
      total: 0,
      color: 'green',
      action: '日',
      iconColor: 'rgb(179, 255, 102)',
      numIcon: 'mdi:book-account-outline',
      bottomTitle: '昨日总计就餐',
    },
    {
      title: '今日就餐数',
      icon: 'download-count|svg',
      value: 0,
      total: 0,
      color: 'orange',
      iconColor: '	rgb(255, 179, 102)',
      numIcon: 'mdi:book-account-outline',
      action: '月',
      bottomTitle: '月总计就餐',
    },
    {
      title: '日就餐消费金额',
      icon: 'ri:money-cny-circle-line',
      value: 0,
      total: 0,
      color: 'rgb(158, 227, 250)',
      iconColor: 'rgb(10, 148, 194)',
      action: '月',
      numIcon: 'mdi:book-account-outline',
      bottomTitle: '月总计金额',
    },

    {
      title: '今日机关办公人数',
      icon: 'ic:outline-work-history',
      iconColor: 'rgb(127, 0, 255)',
      value: 0,
      total: 0,
      color: 'purple',
      action: '周',
      numIcon: 'mdi:book-account-outline',
      bottomTitle: '周总计',
    },
  ]);
  onMounted(async () => {
    const site = await siteStatistic();
    growCardList.value[0].value = site.dayPredMeal;
    growCardList.value[0].total = site.yesterdayMeal;
    growCardList.value[1].value = site.dayMeal;
    growCardList.value[1].total = site.monthMeal;
    growCardList.value[2].value = site.dayMoney;
    growCardList.value[2].total = site.monthMoney;
    growCardList.value[3].value = site.dayAms;
    growCardList.value[3].total = site.monthAms;
  });

  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>
