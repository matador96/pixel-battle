import Layout from '../Layout'
import {
  Game,
  Chat,
  Login,
  Profile,
  Stats,
  Main
} from './../pages'

const routes = [
  {
    path: '/',
    layout: <Layout />,
    component: <Main/>,
    title: 'Главная',
    exact: true
  },
  {
    path: '/game',
    layout: <Layout />,
    component: <Game/>,
    title: 'Pixel Battle',
    exact: true
  },
  {
    path: '/profile',
    layout: <Layout />,
    component: <Profile/>,
    title: 'Профиль',
    exact: true
  },
  {
    path: '/chat',
    layout: <Layout />,
    component: <Chat/>,
    title: 'Чат',
    exact: true
  },
  {
    path: '/stats',
    layout: <Layout />,
    component: <Stats/>,
    title: 'Статистика',
    exact: true
  },
  {
    path: '/login',
    layout: <Layout />,
    component: <Login/>,
    title: 'Войти',
    exact: true
  }
]

export default routes
