import fb from './firebase';
import ACTION_TYPES from '../redux/actionTypes';

// *** Messages *** //
export const messageRef = id => fb.fs.collection(`messages/${id}`);
export const messagesRef = () => fb.fs.collection('messages');

export const convertMessageTexttoAction = text => {
    if(text === 'login') {
        return {
            type: ACTION_TYPES.AuthUserSet
        }
    }
}