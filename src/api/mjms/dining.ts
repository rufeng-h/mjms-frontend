import { BasicPageParams } from '../model/baseModel';
import { Dining, DiningQuery } from './model/diningModel';
import { defHttp } from '/@/utils/http/axios/index';

enum Api {
  Base = '/api/dining',
}

export function pageDining(params: DiningQuery & BasicPageParams) {
  return defHttp.get<Dining[]>({ url: Api.Base, params });
}
