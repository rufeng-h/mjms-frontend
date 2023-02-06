import { LAYOUT } from '/@/router/constant';
import { AppRouteModule } from '/@/router/types';

const test: AppRouteModule = {
  path: '/test',
  name: 'Test',
  meta: {
    title: '测试',
    orderNo: 10,
  },
  component: LAYOUT,
  redirect: { name: 'TestCharts' },
  children: [
    {
      component: () => import('/@/views/mjms/test/charts.vue'),
      path: 'charts',
      name: 'TestCharts',
      meta: {
        title: '测试表格',
      },
    },
  ],
};

export default test;
