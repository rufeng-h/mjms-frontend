import { ManFlow } from './model/manFlowModel';
import { defHttp } from '/@/utils/http/axios';
enum Api {
  Base = '/api/flow',
}
export async function getFlow(date: string) {
  return defHttp.get<ManFlow>({ url: Api.Base, params: { date } });
}
