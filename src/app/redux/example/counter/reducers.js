import { produce } from 'immer';

import {
    COUNTER_INCREASE,
    COUNTER_DECREASE,
    COUNTER_RESET
} from './actionTypes';

const INIT_STATE = {
    count: 0,
    limit: 100,
}

const counterReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case COUNTER_INCREASE:
            return applyIncreaseCounter(state, action);
        case COUNTER_DECREASE:
            return applyDecreaseCounter(state, action);
        case COUNTER_RESET:
            return applyResetCounter(state, action);
        default:
            return state;
    }
}

// *** Immer version *** //
const applyIncreaseCounter = (state, action) => produce(state, draft => {
    draft.count += action.payload.value;
    if (draft.count >= draft.limit) draft.count = draft.limit;
});

const applyDecreaseCounter = (state, action) => produce(state, draft => {
    draft.count -= action.payload.value;
    if (draft.count < 0) draft.count = 0;
});

const applyResetCounter = (state, action) => produce(state, draft => {
    draft.count = 0;
});

export {
    counterReducer
};

// *** Plain Javascript Version *** //
// const applyIncreaseCounter = (state, action) => {

// }

// const applyDecreaseCounter = (state, action) => {

// }

// const applyResetCounter = (state, action) => {

// }