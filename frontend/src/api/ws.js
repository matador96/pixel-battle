import io from 'socket.io-client';

const ws = io('/api', {
  transports: ['websocket'],
  withCredentials: true,
  reconnection: false,
});

export default ws;
