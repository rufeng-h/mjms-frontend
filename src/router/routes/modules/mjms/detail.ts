import { LAYOUT } from '/@/router/constant';
import { AppRouteModule } from '/@/router/types';

const dashboard: AppRouteModule = {
  path: '/detail',
  name: 'Detail',
  component: LAYOUT,
  redirect: '/detail/dining',
  meta: {
    orderNo: 2,
    icon: 'ion:grid-outline',
    title: '数据详情',
  },
  children: [
    {
      path: 'dining',
      name: 'DetailDining',
      component: () => import('/@/views/mjms/detail/Dining.vue'),
      meta: {
        // affix: true,
        title: '每日预测',
      },
    },
    {
      path: 'meal',
      name: 'DetailMeal',
      component: () => import('/@/views/mjms/detail/Meal.vue'),
      meta: {
        title: '就餐记录',
      },
    },
  ],
};

export default dashboard;
