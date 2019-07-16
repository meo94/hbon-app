import {
    FIREBASE_LISTEN_REQUESTED,
    FIREBASE_LISTEN_REJECTED,
    FIREBASE_LISTEN_FULFILLED,
    FIREBASE_LISTEN_REMOVED,
    FIREBASE_LISTEN_CHILD_ADDED,
    FIREBASE_LISTEN_CHILD_CHANGED,
    FIREBASE_LISTEN_CHILD_REMOVED,
} from './actionTypes';

const INIT_NODE_STATE = {
    byIds: {},
    allIds: [],
    inProgress: false,
    error: null,
    ref: null,
};

export const createFirebaseReducer = () => (state = INIT_NODE_STATE, action) => {
    switch (action.type) {
        case FIREBASE_LISTEN_REQUESTED:
            return applyListenRequested(state, action);
        case FIREBASE_LISTEN_REJECTED:
            return applyListenRejected(state, action);
        case FIREBASE_LISTEN_REMOVED:
            return applyListenRemoved(state, action);
        case FIREBASE_LISTEN_FULFILLED:
            return applyListenFulfilled(state, action);
        case FIREBASE_LISTEN_CHILD_ADDED:
            return applyListenChildAdded(state, action);
        case FIREBASE_LISTEN_CHILD_CHANGED:
            return applyListenChildChanged(state, action);
        case FIREBASE_LISTEN_CHILD_REMOVED:
            return applyListenChildRemoved(state, action);
        default:
            return state;
    }
}

const applyListenRequested = (state, action) => {
    const { node, ref } = action.payload;
    return {
        ...state,
        [node]: {
            ...state[node],
            inProgress: true, error: null, ref
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

