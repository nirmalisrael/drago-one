import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Use Routes instead of Switch
import Layout from './components/layout/Layout'; // Layout component for your app
import PageNotFound from './components/common/pages/PageNotFound';
import Home from './components/common/pages/Home';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Home />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<PageNotFound />} /> {/* 404 Page */}
      </Routes>
    </Layout>
  );
};

export default App;
