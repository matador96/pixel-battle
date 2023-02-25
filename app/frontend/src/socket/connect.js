import React, { useState, useEffect } from 'react';
import { default as socket } from '../api/ws';

function UserConnect() {
  const [online, setOnline] = useState(0);

  useEffect(() => {
    socket.on('connect', () => {});
    socket.on('disconnect', () => {});

    socket.on('users-online', (value) => {
      setOnline(value);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const count = online || 0;

  return <>{count}</>;
}

export default UserConnect;
