import React, { Suspense, useLayoutEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteRegistry } from './RouteRegistry';
import type { ModuleRoute } from './types';
import Layout from '../components/layout/Layout';
import { LoadingFallback } from '@/components/common/LoadingFallback';
import PageNotFound from '@/components/common/PageNotFound';

const AppRoutes: React.FC = () => {
  const [routes, setRoutes] = useState<ModuleRoute[]>([]);
  const [isRoutesLoading, setIsRoutesLoading] = useState(true);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [forceUpdate, setForceUpdate] = useState(0);

  useLayoutEffect(() => {
    const initializeRoutes = async () => {
      try {
        console.log('Starting route initialization...');
        setIsRoutesLoading(true);
        setRouteError(null);

        await RouteRegistry.initialize();
        const allRoutes = RouteRegistry.getAllRoutes();

        console.log('Routes loaded successfully:', allRoutes.length, 'routes');
        setRoutes(allRoutes);

        // Force re-render on mobile browsers
        setTimeout(() => {
          setForceUpdate(prev => prev + 1);
        }, 100);
      } catch (error) {
        console.error('Failed to initialize routes:', error);
        setRouteError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setIsRoutesLoading(false);
      }
    };

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isRoutesLoading) {
        console.error('Route initialization timed out');
        setRouteError('Route loading timed out');
        setIsRoutesLoading(false);
      }
    }, 10000); // 10 second timeout

    initializeRoutes().finally(() => {
      clearTimeout(timeoutId);
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Show loading fallback while routes are being initialized
  if (isRoutesLoading) {
    return <LoadingFallback />;
  }

  // Show error if route loading failed
  if (routeError) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Failed to load application</h2>
        <p>Error: {routeError}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  // Fallback if no routes loaded
  if (routes.length === 0) {
    console.warn('No routes loaded, showing fallback');
    return (
      <Routes>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
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
    <Routes key={`routes-${forceUpdate}-${routes.length}`}>
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