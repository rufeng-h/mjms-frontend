import { BasicPageParams } from '../model/baseModel';
import { MealDistribution, MealQuery, MealRecords } from './model/mealModel';
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
