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

const baseDomainReducer = (node) => (state, action) => {
    if (!action || !action.payload || !action.payload.node) return state;
    if (node !== action.payload.node) return state;

    switch (action.type) {
        case DOMAIN_DO_ACTION:
            return (state, action) => produce(state, draft => {
                draft.inProgress = true;
                draft.error = null;
            });
        case DOMAIN_NOTIFY_ERROR:
            return (state, action) => produce(state, draft => {
                draft.inProgress = false;
                draft.error = action.payload.error;
            });
        case DOMAIN_ADD_ITEM:
            return (state, action) => produce(state, draft => {
                const { id, value } = action && action.payload;
                draft.byId[id] = value;
                draft.allIds.push(id);

                draft.inProgress = false;
                draft.error = null;

            });
        case DOMAIN_ADD_ITEMS:
            return (state, action) => produce(state, draft => {
                const { items } = action && action.payload;
                items.forEach(item => {
                    draft.byId[item.id] = item;
                    draft.allIds.push(item.id);
                });

                draft.inProgress = false;
                draft.error = null;
            });
        case DOMAIN_MODIFY_ITEM:
            return (state, action) => produce(state, draft => {
                const { id, value } = action && action.payload;
                draft.byId[id] = value;

                draft.inProgress = false;
                draft.error = null;
            });
        case DOMAIN_MODIFY_ITEMS:
                return (state, action) => produce(state, draft => {
                    const { items } = action && action.payload;
                    items.forEach(item => {
                        draft.byId[item.id] = item;
                    });
    
                    draft.inProgress = false;
                    draft.error = null;
                });
        case DOMAIN_REMOVE_ITEM:
                return (state, action) => produce(state, draft => {
                    const { id } = action && action.payload;
                    delete draft.byId[id];
                   
                    draft.inProgress = false;
                    draft.error = null;
                });
        case DOMAIN_REMOVE_ITEMS:
                return (state, action) => produce(state, draft => {
                    const { items } = action && action.payload;
                    delete draft.byId[id];
                   
                    draft.inProgress = false;
                    draft.error = null;
                });
        case DOMAIN_CLEAR_ITEMS:
            return { ...INIT_DOMAIN_STATE };
        default:
            return state;
    }
};