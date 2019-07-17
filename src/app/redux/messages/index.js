import {
    doListenToFirestoreCollection,
    doRemoveListenerToFirestoreCollection,
} from '../shared/firestoreActions';

import { createFirestoreDomainReducer } from '../shared/firestoreReducers';
import firebaseService from '../../services/firebase';
import { messageRef, messagesRef } from '../../services/chat';

import { getValueByDotKey } from '../shared/utils';

export const MESSAGES_COLLECTION = 'messages';
export const MESSAGES_NODE_STATE = 'domain.messages';

// *** Firebase Actions *** //
export const doAddMessage = (data) => {
    const { text, user } = data;
    const timestamp = firebaseService.fsFieldValue.serverTimestamp();

    return messagesRef().add({
        text,
        userId: user.id,
        username: user.username,

        createAt: timestamp,
        updateAt: timestamp,
        isDelete: false,
    });
}

export const doRemoveMessage = id => {
    return messageRef(id).delete();
}

export const doListenToMessages = () => doListenToFirestoreCollection(MESSAGES_COLLECTION, MESSAGES_NODE_STATE);
export const doRemoveListenToMessages = () => doRemoveListenerToFirestoreCollection(MESSAGES_COLLECTION, MESSAGES_NODE_STATE);

// *** Reducers *** //
export const messagesDomainReducer = createFirestoreDomainReducer(MESSAGES_NODE_STATE);

// *** Selectors *** //
export const selectMessages = state => {
    const messages = getValueByDotKey(state, MESSAGES_NODE_STATE);
    return messages.allIds.map(id => messages.byId[id]);
}