import { BasicColumn } from '/@/components/Table/src/types/table';

export interface Dining {
  dnId: number;
  dnDate: string;
  realBreakfast: number;
  realLunch: number;
  realDinner: number;
  predBreakfast: number;
  predLunch: number;
  predDinner: number;
  amsBreakfast: number;
  amsLunch: number;
  amsDinner: number;
  remark: string;
}

export const diningTableColumns: BasicColumn[] = [
  {
    title: '日期',
    dataIndex: 'dnDate',
  },
  {
    title: '早餐-真实',
    dataIndex: 'realBreakfast',
  },
  {
    title: '早餐-预测',
    dataIndex: 'predBreakfast',
  },
  {
    title: '午餐-真实',
    dataIndex: 'realLunch',
  },
  {
    title: '午餐-预测',
    dataIndex: 'predLunch',
  },
  {
    title: '晚餐-真实',
    dataIndex: 'realDinner',
  },
  {
    title: '晚餐-预测',
    dataIndex: 'realBreakfast',
  },
  {
    title: '门禁-早',
    dataIndex: 'amsBreakfast',
  },
  {
    title: '门禁-中',
    dataIndex: 'amsLunch',
  },
  {
    title: '门禁-晚',
    dataIndex: 'amsDinner',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];