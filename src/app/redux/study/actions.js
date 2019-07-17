import {
    STUDY_SELECT_ACTIVITY,
    STUDY_NEXT_ACTIVITY,
    STUDY_PREVIOUS_ACTIVITY,

    STUDY_DO_ACTIVITY_ATTEMPT,
    STUDY_PAUSE_ACTIVITY_ATTEMPT,
    STUDY_REDO_ACTIVITY_ATTEMPT,
    STUDY_FINISH_ACTIVITY_ATTEMPT,
    STUDY_EXIT_ACTIVITY_ATTEMPT,
} from './actionTypes';

export const doSelectActivity = (id) => ({
    type: STUDY_SELECT_ACTIVITY,
    payload: { id }
});
export const doNextActivity = () => ({ type: STUDY_NEXT_ACTIVITY, });
export const doPreviousActivity = () => ({ type: STUDY_PREVIOUS_ACTIVITY, });


export const doActivityAttempt = () => ({
    type: STUDY_DO_ACTIVITY_ATTEMPT,
});

export const doPauseActivityAttempt = () => ({
    type: STUDY_PAUSE_ACTIVITY_ATTEMPT,
});

export const doRedoActivityAttempt = () => ({
    type: STUDY_REDO_ACTIVITY_ATTEMPT,
});

export const doFinishActivityAttempt = () => ({
    type: STUDY_FINISH_ACTIVITY_ATTEMPT,
});

export const doExitActivityAttempt = () => ({
    type: STUDY_EXIT_ACTIVITY_ATTEMPT,
});