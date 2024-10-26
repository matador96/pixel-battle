import io from 'socket.io-client';

const ws = io('https://pixel.roketka.ru', {
  // localhost:3045
  transports: ['websocket'],
  withCredentials: true,
  reconnection: false,
});

export default ws;
