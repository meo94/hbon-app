import {
    FIRESTORE_LISTEN_REQUESTED,
    FIRESTORE_LISTEN_REJECTED,
    FIRESTORE_LISTEN_FULFILLED,
    FIRESTORE_LISTEN_REMOVED,
    FIRESTORE_LISTEN_DOC_ADDED,
    FIRESTORE_LISTEN_DOC_CHANGED,
    FIRESTORE_LISTEN_DOC_REMOVED,
} from './actionTypes';

const INIT_NODE_STATE = {
    byIds: {},
    allIds: [],
    inProgress: false,
    error: null,
    listener: null,
};

const INIT_STATE = {
    messages: { ...INIT_NODE_STATE },
}

export const createFirestoreReducer = () => (state = INIT_STATE, action) => {
    switch (action.type) {
        case FIRESTORE_LISTEN_REQUESTED:
            return applyListenRequested(state, action);
        case FIRESTORE_LISTEN_REJECTED:
            return applyListenRejected(state, action);
        case FIRESTORE_LISTEN_REMOVED:
            return applyListenRemoved(state, action);
        case FIRESTORE_LISTEN_FULFILLED:
            return applyListenFulfilled(state, action);
        case FIRESTORE_LISTEN_DOC_ADDED:
            return applyListenChildAdded(state, action);
        case FIRESTORE_LISTEN_DOC_CHANGED:
            return applyListenChildChanged(state, action);
        case FIRESTORE_LISTEN_DOC_REMOVED:
            return applyListenChildRemoved(state, action);
        default:
            return state;
    }
}

const applyListenRequested = (state, action) => {
    const { node, listener } = action.payload;
    return {
        ...state,
        [node]: {
            ...state[node],
            inProgress: true, error: null, listener
        }
    };
}

const applyListenRejected = (state, action) => {
    const { node, error } = action.payload;
    return {
        ...state,
        [node]: {
            ...state[node],
            inProgress: false, error
        }
    }
}

const applyListenRemoved = (state, action) => {
    const { node } = action.payload;
    return {
        ...state,
        [node]: {
            ...state[node],
            inProgress: false, error: null, ref: null
        }
    };
}

const applyListenFulfilled = (state, action) => {
    const { node, items } = action.payload;

    return {
        ...state,
        [node]: {
            ...state[node],
            inProgress: false, error: null,
            byIds: items, allIds: Object.keys(items),
        }
    }
}

const applyListenChildAdded = (state, action) => {
    const { node, id, value } = action.payload;
    const currentByIds = state[node].byIds;
    const currentAllIds = state[node].allIds;
    console.log(currentAllIds);
    const byIds = { ...currentByIds, [id]: value };
    const allIds = [...currentAllIds, id];

    return {
        ...state,
        [node]: {
            ...state[node],
            inProgress: false, error: null,
            byIds, allIds,
        }
    }
}

const applyListenChildChanged = (state, action) => {
    const { node, id, value } = action.payload;
    const currentByIds = state[node].byIds;
    const byIds = { ...currentByIds, [id]: value };

    return {
        ...state,
        [node]: {
            ...state[node],
            inProgress: false, error: null,
            byIds,
        }
    }
}

const applyListenChildRemoved = (state, action) => {
    const { node, id } = action.payload;
    const currentByIds = state[node].byIds;
    const byIds = { ...currentByIds };
    delete byIds[id];
    const allIds = state[node].allIds.filter(_id => _id !== id);

    return {
        ...state,
        [node]: {
            ...state[node], inProgress: false, error: null,
            byIds, allIds,
        }
    }
}

