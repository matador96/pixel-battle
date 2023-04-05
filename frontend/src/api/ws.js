import io from 'socket.io-client';

const ws = io('/', {
  // localhost:3045
  transports: ['websocket'],
  withCredentials: true,
  reconnection: false,
});

export default ws;
