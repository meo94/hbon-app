import {
    doListenToFirestoreCollection,
    doRemoveListenerToFirestoreCollection,
} from '../shared/firestoreActions';

import { createFirestoreDomainReducer } from '../shared/firestoreReducers';

export const MESSAGES_COLLECTION = 'messages';
export const MESSAGES_NODE_STATE = 'domain.messages';

export const doListenToMessages = () => doListenToFirestoreCollection(MESSAGES_COLLECTION, MESSAGES_NODE_STATE);
export const doRemoveListenToMessages = () => doRemoveListenerToFirestoreCollection(MESSAGES_COLLECTION, MESSAGES_NODE_STATE);

export const messagesDomainReducer = createFirestoreDomainReducer(MESSAGES_NODE_STATE);
