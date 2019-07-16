import { SESSION_SET_AUTH_USER } from './actionTypes';

const authUserReducer = (state = null, action) => {
    switch(action.type) {
        case SESSION_SET_AUTH_USER:
            return applySetAuthUser(state, action);
        default:
            return state;
    }
}

const applySetAuthUser = (state, action) => action.payload.authUser;

export { authUserReducer }; 