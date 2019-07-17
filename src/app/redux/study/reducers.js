import { produce } from 'immer';

import {
    STUDY_SELECT_ACTIVITY,
    STUDY_NEXT_ACTIVITY,
    STUDY_PREVIOUS_ACTIVITY,
    ACTIVITY_ATTEMPT_STATUS,
} from './actionTypes';

// *** DOMAIN *** //
const INIT_ACTIVITY_DOMAIN_STATE = {
    byId: {
        '1': {
            id: '1',
            courseId: '1',
            unitId: '11',
            name: 'Activity 1',
        },
        '2': {
            id: '2',
            courseId: '1',
            unitId: '11',
            name: 'Activity 2',
        },
        '3': {
            id: '3',
            courseId: '1',
            unitId: '11',
            name: 'Activity 3',
        },
        '4': {
            id: '4',
            courseId: '1',
            unitId: '12',
            name: 'Activity 4',
        }
    },
    allIds: ['1', '2', '3', '4'],
    inProgress: false,
    error: null,
}

const activityDomainReducer = (state = INIT_ACTIVITY_DOMAIN_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const INIT_ACTIVITY_ATTEMPT_DOMAIN_STATE = {
    byId: {
        '11': {
            id: '11',
            activityId: '1',
            userId: 'me',
            status: ACTIVITY_ATTEMPT_STATUS.Complete,
            score: null,
            time: null,
        },
        '12': {
            id: '12',
            activityId: '1',
            userId: 'me',
            status: ACTIVITY_ATTEMPT_STATUS.InProgress,
            score: null,
            time: null,
        },
        '21': {
            id: '21',
            activityId: '2',
            userId: 'me',
            status: ACTIVITY_ATTEMPT_STATUS.Pending,
            score: null,
            time: null,
        },
        '31': {
            id: '31',
            activityId: '3',
            userId: 'me',
            status: ACTIVITY_ATTEMPT_STATUS.Pending,
            score: null,
            time: null,
        }
    },
    allIds: ['11', '12', '21', '31'],
    inProgress: false,
    error: null,
}

const activityAttemptDomainReducer = (state = INIT_ACTIVITY_ATTEMPT_DOMAIN_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

// *** APP *** //
const INIT_STATE = {
    currentActivity: '1',
    currentActivityAttempt: '12',
    unitActivities: ['1', '2', '3'],
}

const activityAppReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case STUDY_SELECT_ACTIVITY:
            return applySelectActivity(state, action);
        case STUDY_NEXT_ACTIVITY:
            return applyNextActivity(state, action);
        case STUDY_PREVIOUS_ACTIVITY:
            return applyPreviousActivity(state, action);
        default:
            return state;
    }
}

const applySelectActivity = (state, action) => produce(state, draft => {
    draft.currentActivity = action.payload.id;
});

const applyNextActivity = (state, action) => produce(state, draft => {
    let idx;
    state.unitActivities.forEach( (activityId, index) => {
        if (state.currentActivity === activityId) {
            idx = index;
        } 
    });
    const len = state.unitActivities.length;

    if (idx + 1 < len) {
        draft.currentActivity = state.unitActivities[idx + 1];
    }
});

const applyPreviousActivity = (state, action) => produce(state, draft => {
    let idx;
    state.unitActivities.forEach( (activityId, index) => {
        if (state.currentActivity === activityId) {
            idx = index;
        } 
    });

    if (idx > 0) {
        draft.currentActivity = state.unitActivities[idx - 1];
    }
});

export {
    activityDomainReducer,
    activityAttemptDomainReducer,

    activityAppReducer
};