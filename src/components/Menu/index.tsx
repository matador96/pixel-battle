import React from 'react';
import { SiDelicious } from 'react-icons/si';
import { RxExit, RxHome, RxPerson, RxPieChart, RxChatBubble, RxPlay } from 'react-icons/rx';
import { animated, useSpring, useSprings } from '@react-spring/web';
import MenuItem from './MenuItem';

const MenuList = [
  {
    label: 'Главная',
    icon: <RxHome />,
    path: '/',
  },
  {
    label: 'Игра',
    icon: <RxPlay />,
    path: '/game',
  },
  {
    label: 'Профиль',
    icon: <RxPerson />,
    path: '/profile',
  },
  {
    label: 'Чат',
    icon: <RxChatBubble />,
    path: '/chat',
  },
  {
    label: 'Статистика',
    icon: <RxPieChart />,
    path: '/stats',
  },
];

const Menu = () => {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0, transform: 'translate(-90px, 0)' },
      to: { opacity: 1, transform: 'translate(0px, 0)' },
    }),
    [],
  );

  return (
    <animated.div style={props} className="menu">
      {MenuList.map((item) => (
        <MenuItem icon={item.icon} label={item.label} path={item.path} />
      ))}

      <div className="menu-item exit">
        <RxExit />
      </div>
    </animated.div>
  );
};

export default Menu;
