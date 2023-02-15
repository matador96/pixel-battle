import Layout from '../Layout'
import Auth from './../features/auth/index'

const routes = [
  {
    path: '/',
    layout: <Layout />,
    component: <div>asfasfasf</div>,
    title: 'Главная',
    exact: true
  },
  {
    path: '/game',
    layout: <Layout />,
    component: <div>345235</div>,
    title: 'Pixel Battle',
    exact: true
  },
  {
    path: '/profile',
    layout: <Layout />,
    component: <div>345235</div>,
    title: 'Профиль',
    exact: true
  },
  {
    path: '/chat',
    layout: <Layout />,
    component: <div>345235</div>,
    title: 'Чат',
    exact: true
  },
  {
    path: '/stats',
    layout: <Layout />,
    component: <div>345235</div>,
    title: 'Статистика',
    exact: true
  },
  {
    path: '/logout',
    layout: <Layout />,
    component: <div>345235</div>,
    title: 'Выход',
    exact: true
  },
  {
    path: '/login',
    layout: <Layout />,
    component: <Auth/>,
    title: 'Войти',
    exact: true
  }
]

export default routes
