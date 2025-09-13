import { lazy } from 'react';
import type { RouteModule, ModuleRouteConfig } from '../../routes/types';
const Settings = lazy(() => import('@/components/common/Settings')); // '@/components/common/Settings';
const LoginForm = lazy(() => import('@/components/forms/LoginForm'));

// Lazy load dashboard pages
class AuthRoutes implements RouteModule {
  getRoutes(): ModuleRouteConfig {
    return {
      moduleName: 'auth',
      basePath: '', // Root level routes
      menuGroup: {
        label: 'Authentication',
        icon: undefined,
      },
      routes: [
        {
          path: '/',
          element: LoginForm,
          title: 'Login',
          icon: undefined,
          requiresAuth: false,
          showInMenu: true,
          menuOrder: 1
        },
        {
          path: '/settings',
          element: Settings,
          title: 'Login',
          icon: undefined,
          requiresAuth: true,
          showInMenu: true,
          menuOrder: 1
        },
      ]
    };
  }
}

export default new AuthRoutes();