
import {
  Game,
  Login,
  Profile,
  Stats
} from './../pages'
import { Navigate } from 'react-router-dom'

const routes = [
  {
    path: '/',
    component: <Navigate to="/game" replace />,
    title: 'Главная',
    exact: true
  },
  {
    path: '/game',
    component: <Game/>,
    title: 'Pixel Battle',
    exact: true
  },
  {
    path: '/profile',
    component: <Profile/>,
    title: 'Profile',
    exact: true
  },
  {
    path: '/stats',
    component: <Stats/>,
    title: 'Stats',
    exact: true
  }
]

export default routes
