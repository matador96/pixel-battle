import io from 'socket.io-client';

const ws = io('case.rocketeers.ru', {
  transports: ['websocket'],
  withCredentials: true,
  reconnection: false,
});

export default ws;
