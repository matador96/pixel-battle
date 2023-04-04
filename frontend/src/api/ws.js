import io from 'socket.io-client';

const ws = io('/', {
  transports: ['websocket'],
  withCredentials: true,
  reconnection: false,
});

export default ws;
