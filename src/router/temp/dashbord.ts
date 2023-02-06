import { LAYOUT } from '/@/router/constant';
import { AppRouteModule } from '/@/router/types';

const dashboard: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/analysis',
  meta: {
    orderNo: 1,
    icon: 'ion:grid-outline',
    title: '分析页',
  },
  children: [
    {
      path: 'analysis',
      name: 'HomeAnalysis',
      component: () => import('/@/views/mjms/dashboard/index.vue'),
      meta: {
        // affix: true,
        title: '分析',
      },
    },
    // {
    //   path: 'meal',
    //   name: 'DetailMeal',
    //   component: () => import('/@/views/mjms/detail/Meal.vue'),
    //   meta: {
    //     title: '就餐记录',
    //   },
    // },
  ],
};
export default dashboard;
