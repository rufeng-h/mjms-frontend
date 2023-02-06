import { LAYOUT } from '/@/router/constant';
import { AppRouteModule } from '/@/router/types';

// @ts-ignore
const dashboard: AppRouteModule = {
  path: '/impact_factor',
  name: 'IF',
  component: LAYOUT,
  redirect: '/impact_factor/activity',
  meta: {
    orderNo: 1,
    icon: 'ion:grid-outline',
    title: '影响因子',
  },
  children: [
    // {
    //   path: 'activity',
    //   name: 'IFActivity',
    //   component: () => import('/@/views/mjms/impact_factor/index.vue'),
    //   meta: {
    //     // affix: true,
    //     title: '活动填报',
    //   },
    // },
    {
      path: 'activity',
      name: 'IFActivity',
      component: () => import('/@/views/mjms/impact_factor2/index.vue'),
      meta: {
        title: '活动填报',
      },
    },
  ],
};

export default dashboard;
