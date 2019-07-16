// *** Generic Actions for Firebase Realtime Database *** //
/*
- node : state node in GLOBAL STATE
- path : path in FIREBASE REALTIME DATABASE
*/

import firebaseService from '../../services/firebase';
import {
    FIREBASE_LISTEN_REQUESTED,
    FIREBASE_LISTEN_REJECTED,
    FIREBASE_LISTEN_FULFILLED,
    FIREBASE_LISTEN_REMOVED,
    FIREBASE_LISTEN_CHILD_ADDED,
    FIREBASE_LISTEN_CHILD_CHANGED,
    FIREBASE_LISTEN_CHILD_REMOVED,
} from './actionTypes';

export const doListenRequestedToFirebase = (node, ref) => ({
    type: FIREBASE_LISTEN_REQUESTED,
    payload: { node, ref },
});

export const doListenRejectedToFirebase = (node, error) => ({
    type: FIREBASE_LISTEN_REJECTED,
    payload: { node, error },
});

export const doListenFulfilledToFirebase = (node, items) => ({
    type: FIREBASE_LISTEN_FULFILLED,
    payload: { node, items },
});

export const doListenChildAddedToFirebase = (node, id, value) => ({
    type: FIREBASE_LISTEN_CHILD_ADDED,
    payload: { node, id, value },
});

export const doListenChildChangedToFirebase = (node, id, value) => ({
    type: FIREBASE_LISTEN_CHILD_CHANGED,
    payload: { node, id, value },
});

export const doListenChildRemovedToFirebase = (node, id) => ({
    type: FIREBASE_LISTEN_CHILD_REMOVED,
    payload: { node, id },
});

export const doRemoveListenRefFirebase = node => ({
    type: FIREBASE_LISTEN_REMOVED,
    payload: { node },
});

export const doListenToFirebasePath = (path, node) =>
    (dispatch, getState) => {
        const ref = firebaseService.db.ref(path);
        dispatch(doListenRequestedToFirebase(node, ref));

        ref.on('child_added', snap => {
            if (getState().domain[node].inProgess) return;
            dispatch(doListenChildAddedToFirebase(node, snap.key, snap.val()));
        });

        ref.on('child_changed', snap => {
            if (getState().domain[node].inProgess) return;
            dispatch(doListenChildChangedToFirebase(node, snap.key, snap.val()));
        });

        ref.on('child_removed', snap => {
            if (getState().domain[node].inProgess) return;
            dispatch(doListenChildRemovedToFirebase(node, snap.key));
        });

        return ref.once('value')
            .then(snap => {
                const val = snap.val();
                const value = val ? val : {};
                dispatch(doListenFulfilledToFirebase(node, value));
            })
            .catch(error => dispatch(doListenRejectedToFirebase(node, error)));
    }

export const doRemoveListenerToFirebasePath = (path, node) =>
    (dispatch, getState) => {
        const state = getState();
        if (state && state[node] && state[node].ref) {
            return state[node].ref.off();
        }
        return Promise.resolve();
    }

export const doListenToFirebaseMessages = () => doListenToFirebasePath('messages', 'messages');
export const doListenToFirebaseSamples = () => doListenToFirebasePath('samples', 'samples');
