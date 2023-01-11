import { Dining } from './model/diningModel';
import { defHttp } from '/@/utils/http/axios/index';

enum Api {
  Base = '/api/dining',
}

export function pageDining(params) {
  return defHttp.get<Dining[]>({ url: Api.Base, params });
}
