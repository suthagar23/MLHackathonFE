import Login from '../views/login/loginView.jsx';

const dashboardRoutes = [
  {
    path: '/welcome',
    name: 'Login',
    icon: 'pe-7s-erro',
    component: Login
  },
  { redirect: true, path: '/', to: '/welcome', name: 'NotFound' }
];

export default dashboardRoutes;
