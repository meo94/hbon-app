import { produce } from 'immer';

import {
    DOMAIN_DO_ACTION,
    DOMAIN_NOTIFY_ERROR,
    DOMAIN_ADD_ITEM,
    DOMAIN_MODIFY_ITEM,
    DOMAIN_REMOVE_ITEM,
    DOMAIN_ADD_ITEMS,
    DOMAIN_MODIFY_ITEMS,
    DOMAIN_REMOVE_ITEMS,
    DOMAIN_CLEAR_ITEMS,
} from './actionTypes';

const INIT_DOMAIN_STATE = {
    byId: {},
    allIds: [],
    inProgress: false,
    error: null,
}

export const createDomainReducer = (node) => (state = INIT_DOMAIN_STATE, action) => {
    if (!action || !action.payload || !action.payload.node) return state;
    if (node !== action.payload.node) return state;

    switch (action.type) {
        case DOMAIN_DO_ACTION: return applyDoAction(state, action);
        case DOMAIN_NOTIFY_ERROR: return applyNotifyError(state, action);
        case DOMAIN_ADD_ITEM: return applyAddItem(state, action);
        case DOMAIN_ADD_ITEMS: return applyAddItems(state, action);
        case DOMAIN_MODIFY_ITEM: return applyModifyItem(state, action);
        case DOMAIN_MODIFY_ITEMS: return applyModifyItems(state, action);
        case DOMAIN_REMOVE_ITEM: return applyRemoveItem(state, action);
        case DOMAIN_REMOVE_ITEMS: return applyRemoveItems(state, action);
        case DOMAIN_CLEAR_ITEMS: return { ...INIT_DOMAIN_STATE };
        default: return state;
    }
};

const applyDoAction = (state, action) => produce(state, draft => {
    draft.inProgress = true;
    draft.error = null;
});

const applyNotifyError = (state, action) => produce(state, draft => {
    draft.inProgress = false;
    draft.error = action.payload.error;
});

const applyAddItem = (state, action) => produce(state, draft => {
    const { id, value } = action && action.payload;
    draft.byId[id] = value;
    draft.allIds.push(id);

    draft.inProgress = false;
    draft.error = null;
});

const applyAddItems = (state, action) => produce(state, draft => {
    const { items } = action && action.payload;

    items.forEach(item => {
        draft.byId[item.id] = item.value;
        draft.allIds.push(item.id);
    });

    draft.inProgress = false;
    draft.error = null;
});

const applyModifyItem = (state, action) => produce(state, draft => {
    const { id, value } = action && action.payload;
    draft.byId[id] = value;

    draft.inProgress = false;
    draft.error = null;
});

const applyModifyItems = (state, action) => produce(state, draft => {
    const { items } = action && action.payload;
    console.log(items);
    
    items.forEach(item => {
        draft.byId[item.id] = item.value;
    });
   
    draft.inProgress = false;
    draft.error = null;
});

const applyRemoveItem = (state, action) => produce(state, draft => {
    const { id } = action && action.payload;
    delete draft.byId[id];
    draft.allIds.splice(draft.allIds.findIndex(_id => _id === id), 1);

    draft.inProgress = false;
    draft.error = null;
});;

const applyRemoveItems = (state, action) => produce(state, draft => {
    const { ids } = action && action.payload;
    ids.forEach(id => {
        delete draft.byId[id];
        draft.allIds.splice(draft.allIds.findIndex(_id => _id === id), 1);
    });

    draft.inProgress = false;
    draft.error = null;
});