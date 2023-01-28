import { BasicColumn } from '/@/components/Table';

export interface MealRecords {
  id: number;

  empId: string;

  cardId: string;

  clockId: number;

  posSequ: number;

  cardSequ: number;

  cardConsume: number;

  mval: number;

  coupon: number;

  cardBalance: number;

  aBalance: number;

  signTime: string;

  opUser: string;
}

export interface MealDistribution {
  type: string;
  consume: number;
  count: number;
}

export interface MealQuery {
  maxConsume?: number;
  minConsume?: number;
  empId?: string;
  cardId?: string;
  sdate?: string;
  edate?: string;
}

export const mealTableColumns: BasicColumn[] = [
  {
    title: '工号',
    dataIndex: 'empId',
  },
  {
    title: '卡号',
    dataIndex: 'cardId',
  },
  {
    title: '消费金额',
    dataIndex: 'cardConsume',
  },
  {
    title: '充值余额',
    dataIndex: 'cardBalance',
  },
  {
    title: '补助余额',
    dataIndex: 'abalance',
  },
  {
    title: '消费时间',
    dataIndex: 'signTime',
  },
  {
    title: '操作人',
    dataIndex: 'opUser',
  },
];
