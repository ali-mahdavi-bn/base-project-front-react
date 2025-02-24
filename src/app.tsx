import './main.css';
import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { MenuDataItem, Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { Auth } from '@/utils';
// import { fetchCurrentMenus, getCurrentUser } from '@/services/system/login';
import { fetchCurrentUser, fetchPublicMenus } from '@/services/system/login';
import { getFlatMenus, transformRoute } from '@umijs/route-utils';
import routes from '../config/routes';
import { patchRoutes } from '@/.umi/plugin-layout/runtime';
import { HOST } from '@/services';
import { AnimatePresence, motion } from 'framer-motion';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const NotFoundPath = '/404';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export const request: RequestConfig = {
  timeout: 60000,
  errorConfig: {
    adaptor: (resData, ctx) => {
      const { success, error } = resData;
      if (success) {
        return { ...resData };
      }

      const { id, code, detail } = error || {};
      let showType = code >= 500 ? 2 : 1;
      if (ctx.req.url === '/api/v1/admin/login' || ctx.req.url === '/api/v1/admin/current/logout') {
        showType = 0;
      }

      return {
        success,
        errorCode: id,
        errorMessage: detail,
        showType: showType,
        ...resData,
      };
    },
  },
  middlewares: [],
  requestInterceptors: [
    (url, options) => {
      let targetURL = url;
      if (url.startsWith('/api/')) {
        targetURL = `${HOST}${url}`;
      }
      const token = Auth.getToken();
      if (token) {
        const headers = {
          ...options.headers,
          Authorization: `${Auth.getTokenType()} ${token}`,
        };
        return {
          url: targetURL,
          options: { ...options, headers },
        };
      }
      return {
        url: targetURL,
        options,
      };
    },
  ],
  responseInterceptors: [
    (response) => {
      if (response.status === 401) {
        // Handle 401 errors globally
        history.push(loginPath);
      } else if (response.status === 404) {
        // Handle 404 errors globally
        history.push(NotFoundPath);
      }
      return response;
    },
  ],
};

type InitialStateProps = {
  fetchInitData?: () => Promise<{
    currentUser?: API.User;
    flatMenus?: Record<string, MenuDataItem>;
  }>;
  settings?: Partial<LayoutSettings>;
  routePathCodeMap?: Record<string, string>;
  currentUser?: API.User;
  isLogin?: boolean;
  flatMenus?: Record<string, MenuDataItem>;
  loading?: boolean;
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialStateProps> {
  const fetchInitData = async () => {
    const convToMenuItems = (
      menus?: API.Menu[],
      parent_code?: string,
    ): MenuDataItem[] | undefined => {
      if (!menus) {
        return undefined;
      }
      const result: MenuDataItem[] = [];
      menus.forEach((menu) => {
        if (!menu.code) {
          return;
        }
        const code = parent_code ? `${parent_code}.${menu.code}` : `${menu.code}`;
        const menuItem: MenuDataItem = {
          key: code,
          path: code,
          children: convToMenuItems(menu.children, code),
        };
        result.push(menuItem);
      });
      return result;
    };
    let flatMenus: Record<string, MenuDataItem> = {};
    try {
      const { currentUser, isLogin } = await fetchCurrentUser();
      const menus = await fetchPublicMenus();
      if (menus.data) {
        const menuItems = convToMenuItems(menus.data);
        flatMenus = getFlatMenus(menuItems);
      }
      return { currentUser, isLogin, flatMenus };
    } catch (e) {
      console.error(e);
    }

    // try {
    //   const userRes = await getCurrentUser();
    //   const currentUser = userRes.data;
    //   if (currentUser) {
    //     currentUser.statusChecked = currentUser?.status === 'activated';
    //   }
    //   let flatMenus: Record<string, MenuDataItem> = {};
    //   try {
    //     const menus = await fetchCurrentMenus();
    //     if (menus.data) {
    //       const menuItems = convToMenuItems(menus.data);
    //       flatMenus = getFlatMenus(menuItems);
    //     }
    //     return { currentUser, flatMenus };
    //   } catch (e) {
    //     console.error(e);
    //   }
    //   return { currentUser, flatMenus };
    // } catch (error) {
    // history.push(loginPath);
    // }
    return {};
  };

  const flatRouteMenus = getFlatMenus(transformRoute(routes).menuData);
  const routePathCodeMap: Record<string, string> = {};
  Object.keys(flatRouteMenus).forEach((key) => {
    const menu = flatRouteMenus[key];
    let code = menu.code;
    if (menu.pro_layout_parentKeys) {
      const codes: string[] = [];
      menu.pro_layout_parentKeys.forEach((p) => {
        codes.push(flatRouteMenus[p].code);
      });
      if (codes.length > 0) {
        code = `${codes.join('.')}.${code}`;
      }
    }
    routePathCodeMap[menu.path!] = code;
  });

  if (history.location.pathname !== loginPath) {
    const data = await fetchInitData();
    return {
      fetchInitData: fetchInitData,
      settings: defaultSettings,
      routePathCodeMap,
      ...data,
    };
  }

  return {
    fetchInitData: fetchInitData,
    settings: defaultSettings,
    routePathCodeMap,
  };
}

// https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  const loopMenuItems = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menus || menus.length === 0) {
      return [];
    }

    const result: MenuDataItem[] = [];
    menus.forEach((menu) => {
      if (
        !menu.path ||
        !initialState ||
        !initialState.routePathCodeMap ||
        !initialState.flatMenus
      ) {
        return;
      }
      const code = initialState.routePathCodeMap[menu.path];
      if (code && initialState.flatMenus.hasOwnProperty(code)) {
        const menuItem: MenuDataItem = {
          ...menu,
        };
        const children = loopMenuItems(menu.children);
        menuItem.children = children;
        menuItem.routes = children;
        result.push(menuItem);
      }
    });
    console.log(result);
    return result;
  };

  return {
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,

    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        // history.push(loginPath);
      }
    },
    menu: {
      params: {
        userId: initialState?.currentUser?.id,
      },
      request: async () => {
        const data = loopMenuItems(transformRoute(routes).menuData);
        patchRoutes({ routes: data });
        return data;
      },
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>Components</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    childrenRender: (children, props) => {
      const fadeVariants = {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -15 },
      };

      return (
        <AnimatePresence mode="wait">
          <motion.div
            key={props.location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeVariants}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ minHeight: '100vh' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      );
    },
    ...initialState?.settings,
  };
};
