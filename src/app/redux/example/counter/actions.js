import {
    COUNTER_INCREASE,
    COUNTER_DECREASE,
    COUNTER_RESET,
} from './actionTypes';

export const doIncreaseCounter = value => ({
    type: COUNTER_INCREASE,
    payload: { value }
});

export const doDecreaseCounter = value => ({
    type: COUNTER_DECREASE,
    payload: { value }
});

export const doResetCounter = () => ({
    type: COUNTER_RESET,
});



