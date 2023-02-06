import { string } from 'vue-types';

export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
  bottomTitle: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: '今日预计就餐',
    icon: 'visit-count|svg',
    value: 2000,
    total: 120000,
    color: 'green',
    action: '日',
    bottomTitle: '昨日总计就餐',
  },
  {
    title: '今日就餐',
    icon: 'download-count|svg',
    value: 8000,
    total: 120000,
    color: 'orange',
    action: '月',
    bottomTitle: '月总计就餐',
  },
  {
    title: '消费金额',
    icon: 'total-sales|svg',
    value: 20000,
    total: 500000,
    color: 'blue',
    action: '月',
    bottomTitle: '月总计金额',
  },

  {
    title: '机关办公人数',
    icon: 'transaction|svg',
    value: 5000,
    total: 50000,
    color: 'purple',
    action: '周',
    bottomTitle: '周总计',
  },
];
