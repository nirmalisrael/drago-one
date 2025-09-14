import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteRegistry } from './RouteRegistry';
import type { ModuleRoute } from './types';
import Layout from '../components/layout/Layout';
import { LoadingFallback } from '@/components/common/LoadingFallback';
import PageNotFound from '@/components/common/PageNotFound';

const AppRoutes: React.FC = () => {
  const [routes, setRoutes] = useState<ModuleRoute[]>([]);
  const [isRoutesLoading, setIsRoutesLoading] = useState(true);

  useEffect(() => {
    const initializeRoutes = async () => {
      try {
        setIsRoutesLoading(true);
        await RouteRegistry.initialize();
        setRoutes(RouteRegistry.getAllRoutes());
      } catch (error) {
        console.error('Failed to initialize routes:', error);
      } finally {
        setIsRoutesLoading(false);
      }
    };

    initializeRoutes();
  }, []);

  // Show loading fallback while routes are being initialized
  if (isRoutesLoading) {
    return <LoadingFallback />;
  }

  // Separate public and protected routes
  const publicRoutes = routes.filter(route => route.requiresAuth === false);
  const protectedRoutes = routes.filter(route => route.requiresAuth !== false);

  const renderRoute = (route: ModuleRoute, isPublic = false) => {
    console.log('Route:', route, isPublic);

    const RouteComponent = route.element;
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <Suspense fallback={<LoadingFallback />}>
            <RouteComponent />
          </Suspense>
        }
      />
    );
  };

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(route => renderRoute(route, true))}

      {/* Protected Routes with Layout */}
      <Route path="/*" element={
        <Layout>
          <Routes>
            {protectedRoutes.map(route => renderRoute(route, false))}

            {/* Fallback route */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
};

export default AppRoutes;