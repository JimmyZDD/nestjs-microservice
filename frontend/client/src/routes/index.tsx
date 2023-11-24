/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:47
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-23 22:52:14
 * @FilePath: index.tsx
 */
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';
import Login from './login';
import App from './App';
import Home from './home';
import Movie from './movie';
import Order from './order';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/movie',
        element: <Movie />
      },
      {
        path: '/order',
        element: <Order />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />
  }
]);

export default router;
