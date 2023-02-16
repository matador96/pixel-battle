import React from 'react';
import { SiDelicious } from 'react-icons/si';
import { animated, useSpring, useSprings } from '@react-spring/web';

const Logo = () => {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0, transform: 'scale(0)' },
      to: { opacity: 1, transform: 'scale(1)' },
    }),
    [],
  );

  return (
    <animated.div style={props} className="logo">
      <SiDelicious />
    </animated.div>
  );
};

export default Logo;
