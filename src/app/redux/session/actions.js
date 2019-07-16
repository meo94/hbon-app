import { SESSION_SET_AUTH_USER } from './actionTypes';

export const doSetAuthUser = authUser => ({
    type: SESSION_SET_AUTH_USER,
    payload: { authUser },
});