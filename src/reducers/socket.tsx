import io from 'socket.io-client';
import { ActionType } from '../constants/globalInterface';

const socket = io.connect('http://localhost:3002');

export default function reducer(state = socket, action: ActionType) {
    const io = state;
    switch (action.type) {
        default:
            return io;
        
    }
}
