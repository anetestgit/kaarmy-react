import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
//
import BlogPage from '../pages/back/BlogPage';
import UserList from '../pages/back/user/UserList';
import Page404 from '../pages/Page404';
import ProductsPage from '../pages/back/ProductsPage';
import DashboardAppPage from '../pages/back/DashboardAppPage';
import LoginPage from '../pages/front/LoginPage';
import RegisterPage from '../pages/front/RegisterPage';
// ----------------------------------------------------------------------

export default function RouterLink() {
  const UserAuhenticated = JSON.parse(localStorage.getItem('userdetails'));

  const routes = useRoutes([

    { element:  UserAuhenticated ? <Navigate to="/dashboard" /> :<Navigate to="/login" />, index: true },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
         { element: <Navigate to="/dashboard/home" />, index: true },
        { path: 'home', element:  UserAuhenticated ?   <DashboardAppPage /> : <Navigate to="/login" />},
        { path: 'user', element: UserAuhenticated ? <UserList />  : <Navigate to="/login" />},
        { path: 'products', element: UserAuhenticated ? <ProductsPage />  : <Navigate to="/login" />},
        { path: 'blog', element: UserAuhenticated ?  <BlogPage />  : <Navigate to="/login" />},
      ],
    },
   
    {
      path: '404',
      element: <Page404 />,
    },

    {
      path: 'login',
      element: !UserAuhenticated? <LoginPage />  : <Navigate to="/dashboard/home" />,
    },
    {
      path: 'register',
      element:  !UserAuhenticated? <RegisterPage /> :<Navigate to="/dashboard/home" />,
    },
    {
      path: '404',
      element: <Page404 />,
    },


  ]);

  return routes;
}
