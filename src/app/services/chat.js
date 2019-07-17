import fb from './firebase';
import { SESSION_SET_AUTH_USER } from '../redux/session/actionTypes';

// *** Messages *** //
export const messageRef = id => fb.fs.doc(`messages/${id}`);
export const messagesRef = () => fb.fs.collection('messages');

// export const convertMessageTexttoAction = text => {
//     if (text === 'login') {
//         return {
//             type: SESSION_SET_AUTH_USER,
//         }
//     }
// }