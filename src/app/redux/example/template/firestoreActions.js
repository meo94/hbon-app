// *** Generic Actions for Firestore *** //

import firebaseService from '../../../services/firebase';
import {
    FIRESTORE_LISTEN_REQUESTED,
    FIRESTORE_LISTEN_REJECTED,
    FIRESTORE_LISTEN_FULFILLED,
    FIRESTORE_LISTEN_REMOVED,
    FIRESTORE_LISTEN_DOC_ADDED,
    FIRESTORE_LISTEN_DOC_CHANGED,
    FIRESTORE_LISTEN_DOC_REMOVED,
} from './actionTypes';

export const doListenRequestedToFirestore = (node, listener) => ({
    type: FIRESTORE_LISTEN_REQUESTED,
    payload: { node, listener },
});

export const doListenRejectedToFirestore = (node, error) => ({
    type: FIRESTORE_LISTEN_REJECTED,
    payload: { node, error },
});

export const doListenFulfilledToFirestore = (node, items) => ({
    type: FIRESTORE_LISTEN_FULFILLED,
    payload: { node, items },
});

export const doListenDocAddedToFirestore = (node, id, value) => ({
    type: FIRESTORE_LISTEN_DOC_ADDED,
    payload: { node, id, value },
});

export const doListenDocChangedToFirestore = (node, id, value) => ({
    type: FIRESTORE_LISTEN_DOC_CHANGED,
    payload: { node, id, value },
});

export const doListenDocRemovedToFirestore = (node, id) => ({
    type: FIRESTORE_LISTEN_DOC_REMOVED,
    payload: { node, id },
});

export const doRemoveListenerFirestore = node => ({
    type: FIRESTORE_LISTEN_REMOVED,
    payload: { node },
});

export const doListenToFirestoreCollection = (collection, node) =>
    (dispatch, getState) => {
        const listener = firebaseService.fs.collection(collection)
            .onSnapshot(snap => {
                const state = getState().domain[node];
                if (state && state.allIds && state.allIds.length === 0) {
                    let items = {};
                    snap.forEach(doc => items[doc.id] = { ...doc.data(), id: doc.id });
                    dispatch(doListenFulfilledToFirestore(node, items));
                    return;
                }

                snap.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        if (getState().domain[node].inProcess) return;
                        dispatch(doListenDocAddedToFirestore(node, change.doc.id, { ...change.doc.data(), id: change.doc.id }));
                    }
                    else if (change.type === 'modified') {
                        if (getState().domain[node].inProcess) return;
                        dispatch(doListenDocAddedToFirestore(node, change.doc.id, { ...change.doc.data(), id: change.doc.id }));
                    }
                    else if (change.type === 'removed') {
                        if (getState().domain[node].inProcess) return;
                        dispatch(doListenDocRemovedToFirestore(node, change.doc.id));
                    }
                });
            }, error => dispatch(doListenRejectedToFirestore(node, error)));
        ;

        dispatch(doListenRequestedToFirestore(node, listener));
    }

export const doRemoveListenerToFirestoreCollection = (path, node) =>
    (dispatch, getState) => {
        return Promise.resolve();
    }