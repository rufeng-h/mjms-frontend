import { BasicPageParams } from '../model/baseModel';
import { MealQuery, MealRecords } from './model/mealModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Base = '/api/meal',
}

export async function pageMeal(params: MealQuery & BasicPageParams) {
  return defHttp.get<MealRecords[]>({ url: Api.Base, params });
}
