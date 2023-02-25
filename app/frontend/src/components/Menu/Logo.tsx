import React from 'react';
import { SiDelicious } from 'react-icons/si';
import { animated, useSpring, useSprings } from '@react-spring/web';
import { useNavigate } from 'react-router';

const Logo = () => {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0, transform: 'scale(0)' },
      to: { opacity: 1, transform: 'scale(1)' },
    }),
    [],
  );

  const navigate = useNavigate();

  return (
    <animated.div style={props} className="logo" onClick={() => navigate('/game')}>
      <SiDelicious />
    </animated.div>
  );
};

export default Logo;
