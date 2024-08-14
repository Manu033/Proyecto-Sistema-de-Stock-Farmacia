import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/AdminPage';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from '../utils/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
