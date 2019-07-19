import {
    DOMAIN_DO_ACTION,
    DOMAIN_NOTIFY_ERROR,
    DOMAIN_ADD_ITEM,
    DOMAIN_MODIFY_ITEM,
    DOMAIN_REMOVE_ITEM,
    DOMAIN_ADD_ITEMS,
    DOMAIN_MODIFY_ITEMS,
    DOMAIN_REMOVE_ITEMS,
} from './actionTypes';

export const doDomainAction = (node) => ({ type: DOMAIN_DO_ACTION, payload: { node } });
export const doNotifyError = (node, error) => ({ type: DOMAIN_NOTIFY_ERROR, payload: { node, error } });

export const doAddItemToDomain = (node, id, value) => ({
    type: DOMAIN_ADD_ITEM,
    payload: {
        node, id, value: { ...value, id },
    }
});
export const doModifyItemToDomain = (node, id, value) => ({
    type: DOMAIN_MODIFY_ITEM,
    payload: {
        node, id, value: { ...value, id },
    }
});
export const doRemoveItemToDomain = (node, id) => ({
    type: DOMAIN_REMOVE_ITEM,
    payload: { node, id }
});

export const doAddItemsToDomain = (node, items) => {
    items = items.map(item => ({ id: item.id, value: { ...item.value, id: item.id } }));
    return ({
        type: DOMAIN_ADD_ITEMS,
        payload: { node, items } // items = [ {id, value: { id } }, {id, value: { id } } ]
    });
};
export const doModifyItemsToDomain = (node, items) => {
    items = items.map(item => ({ id: item.id, value: { ...item.value, id: item.id } }));
    return ({
        type: DOMAIN_MODIFY_ITEMS,
        payload: { node, items }
    });
};

export const doRemoveItemsToDomain = (node, ids) => ({
    type: DOMAIN_REMOVE_ITEMS,
    payload: { node, ids }
});