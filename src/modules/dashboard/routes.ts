import { lazy } from 'react';
import type { RouteModule, ModuleRouteConfig } from '../../routes/types';
import DashboardIcon from '@mui/icons-material/Dashboard';
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const Home = lazy(() => import('@/components/common/Home'));

// Lazy load dashboard pages
class DashboardRoutes implements RouteModule {
  getRoutes(): ModuleRouteConfig {
    return {
      moduleName: 'dashboard',
      basePath: '', // Root level routes
      menuGroup: {
        label: 'Dashboard',
        icon: DashboardIcon,
        order: 1
      },
      routes: [
        {
          path: '/',
          element: DashboardPage,
          title: 'Dashboard',
          icon: DashboardIcon,
          requiresAuth: true,
          showInMenu: true,
          menuOrder: 1,
          meta: {
            description: 'Main dashboard with overview',
            keywords: ['dashboard', 'overview', 'statistics']
          }
        },
        {
          path: '/dashboard',
          element: Home,
          title: 'Dashboard',
          requiresAuth: true,
          showInMenu: false, // Don't show duplicate in menu
        },
        {
          path: '/analytics',
          element: AnalyticsPage,
          title: 'Analytics',
          requiresAuth: true,
          showInMenu: true,
          menuOrder: 2,
          roles: ['admin', 'manager']
        },
        {
          path: '/reports',
          element: ReportsPage,
          title: 'Reports',
          requiresAuth: true,
          showInMenu: true,
          menuOrder: 3,
          roles: ['admin']
        }
      ]
    };
  }
}

export default new DashboardRoutes();