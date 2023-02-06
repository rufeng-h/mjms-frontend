import { BasicColumn } from '/@/components/Table';
export interface AgeMeal {
  ageInterval: string;
  count: number;
}

export interface DeptMeal {
  dept: string;
  count: number;
  total: number;
}

export interface SiteStatistic {
  /**
   * 今日预计就餐
   */
  dayPredMeal: number;
  yesterdayMeal: number;

  /**
   * 今日就餐人次
   */
  dayMeal: number;
  /**
   * 月总人次
   */
  monthMeal: number;

  /**
   * 日总金额
   */
  dayMoney: number;

  /**
   * 月总金额
   */
  monthMoney: number;

  /**
   * 今日门禁
   */
  dayAms: number;

  /**
   * 月总门禁
   */
  monthAms: number;
}

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
