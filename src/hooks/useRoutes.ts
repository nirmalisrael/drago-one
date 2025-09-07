import React, { useMemo } from 'react';
import { RouteRegistry } from '../routes/RouteRegistry';
import type { ModuleRouteConfig, ModuleRoute } from '../routes/types';

export const useRoutes = () => {
  const menuRoutes = useMemo(() => {
    return RouteRegistry.getMenuRoutes();
  }, []);

  const allRoutes = useMemo(() => {
    return RouteRegistry.getAllRoutes();
  }, []);

  const generateMenuData = useMemo(() => {
    return menuRoutes
      .filter(module => module.routes.some(route => route.showInMenu))
      .map(module => {
        const mainRoute = module.routes.find(route => route.showInMenu);
        return {
          label: module.menuGroup?.label || mainRoute?.title || 'Unknown',
          path: module.basePath + (mainRoute?.path || ''),
          icon: module.menuGroup?.icon ? React.createElement(module.menuGroup.icon) : undefined,
          subItems: mainRoute?.children
            ?.filter(child => child.showInMenu)
            ?.sort((a, b) => (a.menuOrder || 999) - (b.menuOrder || 999))
            ?.map(child => ({
              label: child.title,
              path: module.basePath + mainRoute.path + child.path,
            }))
        };
      })
      .sort((a, b) => {
        const orderA = menuRoutes.find(m => m.menuGroup?.label === a.label)?.menuGroup?.order || 999;
        const orderB = menuRoutes.find(m => m.menuGroup?.label === b.label)?.menuGroup?.order || 999;
        return orderA - orderB;
      });
  }, [menuRoutes]);

  const getRouteByPath = (path: string): ModuleRoute | undefined => {
    return allRoutes.find(route => route.path === path);
  };

  const getModuleRoutes = (moduleName: string): ModuleRouteConfig | undefined => {
    return RouteRegistry.getModuleRoutes(moduleName);
  };

  return {
    menuRoutes,
    allRoutes,
    generateMenuData,
    getRouteByPath,
    getModuleRoutes,
  };
};