import { BasicPageParams } from '../model/baseModel';
import { Dining, DiningQuery } from './model/diningModel';
import { defHttp } from '/@/utils/http/axios/index';

enum Api {
  Base = '/api/dining',
}

export function pageDining(params: DiningQuery & BasicPageParams) {
  return defHttp.get<Dining[]>({ url: Api.Base, params });
}

export function getDining(date: string) {
  return defHttp.get<Dining>({ url: `${Api.Base}/${date}` });
}

export function listDining(data: string[]) {
  return defHttp.post<Dining[]>({ url: `${Api.Base}/list`, data });
}
