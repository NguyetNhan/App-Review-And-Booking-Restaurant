import io from 'socket.io-client';
import { urlServer } from '../config';
const socket = io(urlServer);
export default socket;
