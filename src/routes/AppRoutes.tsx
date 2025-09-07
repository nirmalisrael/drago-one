import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteRegistry } from './RouteRegistry';
import type { ModuleRoute } from './types';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/layout/Layout';
import { LoadingFallback } from '@/components/common/LoadingFallback';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import PageNotFound from '@/components/common/PageNotFound';

const AppRoutes: React.FC = () => {
  const [routes, setRoutes] = useState<ModuleRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeRoutes = async () => {
      try {
        await RouteRegistry.initialize();
        setRoutes(RouteRegistry.getAllRoutes());
      } catch (error) {
        console.error('Failed to initialize routes:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeRoutes();
  }, []);

  // Separate public and protected routes
  const publicRoutes = routes.filter(route => route.requiresAuth === false);
  const protectedRoutes = routes.filter(route => route.requiresAuth !== false);

  const renderRoute = (route: ModuleRoute, isPublic = false) => {
    const RouteComponent = route.element;
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <Suspense fallback={<LoadingFallback />}>
            {/* {isPublic ? ( */}
            <RouteComponent />
            {/* ) : (
                <ProtectedRoute
                  requiresAuth={route.requiresAuth}
                  roles={route.roles}
                >
                  <RouteComponent />
                </ProtectedRoute>
              )} */}
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
        // <ProtectedRoute>
        <Layout>
          <Routes>
            {protectedRoutes.map(route => renderRoute(route, false))}

            {/* Fallback route */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
        // </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;
