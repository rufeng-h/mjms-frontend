import { BasicPageParams } from '../model/baseModel';
import {
  MealDistribution,
  MealQuery,
  MealRecords,
  AgeMeal,
  DeptMeal,
  SiteStatistic,
} from './model/mealModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Base = '/api/meal',
}

export async function pageMeal(params: MealQuery & BasicPageParams) {
  return defHttp.get<MealRecords[]>({ url: Api.Base, params });
}

export async function mealDist(date: string | undefined) {
  return defHttp.get<MealDistribution[]>({ url: Api.Base + '/distribution', params: { date } });
}

export async function ageMeal(date: string) {
  return defHttp.get<AgeMeal[]>({ url: `${Api.Base}/ageMeal`, params: { date } });
}

export async function deptMeal(date: string) {
  return defHttp.get<DeptMeal[]>({ url: `${Api.Base}/deptMeal`, params: { date } });
}
export async function siteStatistic() {
  return defHttp.get<SiteStatistic>({ url: `${Api.Base}/statistic` });
}
