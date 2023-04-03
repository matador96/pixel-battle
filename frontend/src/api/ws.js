import io from 'socket.io-client';

const ws = io(process.env.API_URL, {
  transports: ['websocket'],
  withCredentials: true,
  reconnection: false,
});

export default ws;
