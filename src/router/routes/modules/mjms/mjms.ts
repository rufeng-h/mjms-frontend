import { LAYOUT } from '/@/router/constant';
import { AppRouteModule } from '/@/router/types';

const dashboard: AppRouteModule = {
  path: '/dining',
  name: 'Dining',
  component: LAYOUT,
  redirect: '/dining/overview',
  meta: {
    orderNo: 1,
    icon: 'ion:grid-outline',
    title: '数据概览',
  },
  children: [
    {
      path: 'overview',
      name: 'Overview',
      component: () => import('/@/views/mjms/Overview.vue'),
      meta: {
        // affix: true,
        title: '数据概览',
      },
    },
  ],
};

export default dashboard;
