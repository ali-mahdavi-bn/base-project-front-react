export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin/home',
    code: 'home',
    name: 'home',
    icon: 'dashboard',
    component: './Welcome',
  },
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
  },
  {
    path: '/admin/systemaa/home2',
    code: 'home2',
    name: 'home',
    component: './system/Logger',
  },
  {
    path: '/products/:id',
    code: 'home2',
    name: 'home',
    component: './Post',
  },
  {
    path: '/admin/account/profile',
    name: 'account.settings',
    component: './user/Profile',
    hideInMenu: true,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/admin',
    redirect: '/admin/home',
  },
  {
    path: '/home',
    name: 'ali',
    component: './Home',
    hideInMenu: true,
  },
  {
    component: './404',
  },
];
