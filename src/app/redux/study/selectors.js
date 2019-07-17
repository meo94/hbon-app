import { getValueByDotKey } from '../shared/utils';

export const selectCurrentActivity = state => {
    const activities = getValueByDotKey(state, 'domain.activities');
    const currentActivity = getValueByDotKey(state, 'app.activity.currentActivity');
    return activities.byId[currentActivity];
}
export const selectCurrentActivityAttempts = state => {
    const activityAttempts = getValueByDotKey(state, 'domain.activityAttempts');
    const currentActivityAttempt = getValueByDotKey(state, 'app.activity.currentActivityAttempt');
    return activityAttempts.byId[currentActivityAttempt];

}

export const selectUnitActivities = state => {
    const activities = getValueByDotKey(state, 'domain.activities');
    // console.log(getValueByDotKey(state, 'app.activity.unitActivities').map(id => activities.byId[id]));
    return getValueByDotKey(state, 'app.activity.unitActivities').map(id => activities.byId[id]);
}