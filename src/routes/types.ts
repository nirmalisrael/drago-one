import { ComponentType, LazyExoticComponent } from 'react';

export interface ModuleRoute {
  path: string;
  element: LazyExoticComponent<ComponentType<any>>;
  title: string;
  icon?: ComponentType;
  requiresAuth?: boolean;
  roles?: string[];
  showInMenu?: boolean;
  menuOrder?: number;
  children?: ModuleRoute[];
  meta?: {
    description?: string;
    keywords?: string[];
    breadcrumb?: string;
  };
}

export interface ModuleRouteConfig {
  moduleName: string;
  basePath: string;
  routes: ModuleRoute[];
  menuGroup?: {
    label: string;
    icon?: ComponentType;
    order?: number;
  };
}

export interface RouteModule {
  getRoutes(): ModuleRouteConfig;
}
