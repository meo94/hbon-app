import {
    FIRESTORE_LISTEN_REQUESTED,
    FIRESTORE_LISTEN_REJECTED,
    FIRESTORE_LISTEN_FULFILLED,
    FIRESTORE_LISTEN_REMOVED,
    FIRESTORE_LISTEN_DOC_ADDED,
    FIRESTORE_LISTEN_DOC_CHANGED,
    FIRESTORE_LISTEN_DOC_REMOVED,
} from './actionTypes';

const INIT_STATE = {
    byId: {},
    allIds: [],
    inProgress: false,
    error: null,
    listener: null,
};

const firestoreDomainReducer = (state = INIT_STATE, action) => {
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

const createFirestoreDomainReducer = (reducerNode) => {
    return (state = INIT_STATE, action) => {
        if (!action || !action.payload) return state;
        
        const { node } = action.payload;
        if (node !== reducerNode) return state;
        return firestoreDomainReducer(state, action);
    }
}
const applyListenRequested = (state, action) => {
    const { listener } = action.payload;

    return { ...state, inProgress: true, error: null, listener };
}

const applyListenRejected = (state, action) => {
    const { error } = action.payload;

    return { ...state, inProgress: false, error };
}

const applyListenRemoved = (state, action) => {
    return { ...state, inProgress: false, error: null, listener: null };
}

const applyListenFulfilled = (state, action) => {
    const { items } = action.payload;

    return {
        ...state, inProgress: false, error: null,
        byId: items, allIds: Object.keys(items),
    }
}

const applyListenChildAdded = (state, action) => {
    const { id, value } = action.payload;
    const byId = { ...state.byId, [id]: value };
    const allIds = [...state.allIds, id];

    return {
        ...state, inProgress: false, error: null,
        byId, allIds,
    }
}

const applyListenChildChanged = (state, action) => {
    const { id, value } = action.payload;
    const byId = { ...state.byId, [id]: value };

    return {
        ...state, inProgress: false, error: null,
        byId,
    }
}

const applyListenChildRemoved = (state, action) => {
    const { id } = action.payload;
    const byId = { ...state.byId };
    delete byId[id];
    const allIds = state.allIds.filter(_id => _id !== id);

    return {
        ...state,
        inProgress: false, error: null,
        byId, allIds,
    }
}

export { createFirestoreDomainReducer };