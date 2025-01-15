import { MenuDataItem } from '@umijs/route-utils';

const  menuRoutes: MenuDataItem[] = [
  {
    path: '/admin/system',
    code: 'system',
    name: 'system',
    icon: 'setting',
    routes: [
      {
        path: '/admin/system',
        redirect: '/admin/system/menu',
      },
      {
        path: '/admin/system/menu',
        code: 'menu',
        name: 'menu',
        component: './system/Menu',
      },
      {
        path: '/admin/system/ali',
        code: 'ali',
        name: 'ali',
        component: './system/Menu',
      },
      {
        path: '/admin/system/role',
        code: 'role',
        name: 'role',
        component: './system/Role',
      },
      {
        path: '/admin/system/user',
        code: 'user',
        name: 'user',
        component: './system/User',
      },
      {
        path: '/admin/system/logger',
        code: 'logger',
        name: 'logger',
        component: './system/Logger',
      },
    ],
  }
]
export default menuRoutes
