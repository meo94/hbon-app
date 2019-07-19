import { getValueByDotKey } from '../../shared/utils';

export const selectItemById = (state, node, id) => {
    const domain = getValueByDotKey(state, node);
    return domain.byId[id];
}

export const selectItemByIds = (state, node, ids) => {
    const domain = getValueByDotKey(state, node);
    return ids.map(id => domain.byId[id]);
}

export const selectAllItems = (state, node) => {
    const domain = getValueByDotKey(state, node);
    return domain.allIds.map(id => domain.byId[id]);
}