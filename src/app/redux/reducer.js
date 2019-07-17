import { combineReducers } from 'redux';
import { nestedCombineReducers } from 'nested-combine-reducers';

import { exampleReducer } from './example/reducers';
import { authUserReducer } from './session/reducers';
import { setValueByDotKey } from './shared/utils';

import { MESSAGES_NODE_STATE, messagesDomainReducer } from './messages';
import {
    activityDomainReducer,
    activityAttemptDomainReducer, 
    activityAppReducer 
} from './study/reducers';


const registerReducerObject = {};
setValueByDotKey(registerReducerObject, MESSAGES_NODE_STATE, messagesDomainReducer);
setValueByDotKey(registerReducerObject, 'domain.activities', activityDomainReducer);
setValueByDotKey(registerReducerObject, 'domain.activityAttempts', activityAttemptDomainReducer);

setValueByDotKey(registerReducerObject, 'app.activity', activityAppReducer);

const rootReducer = nestedCombineReducers({
    example: exampleReducer,
    authUser: authUserReducer,
    ...registerReducerObject,
}, combineReducers);

// const a = {
//     domain: {
//         courses: {
//             '1': {
//                 id: '1',
//                 outline: [
//                     {
//                         id: '1',
//                         name: 'unit 1',
//                         activities: ['1', '2'],
//                     },
//                     {
//                         id: '2',
//                         name: 'unit 2',
//                         activities: ['3'],
//                     },
//                     {
//                         id: '3',
//                         name: 'unit 3',
//                         activities: ['4'],
//                     },
//                 ]
//             }
//         },

//         activities: {
//             '1': {
//                 id: '1',
//             },
//             '2': {
//                 id: '2',
//             },
//             '3': {
//                 id: '3',
//             },
//             '4': {
//                 id: '4',
//             },
//         },

//         activityAttempts: {
//             '1': {
//                 userId: 'me',
//                 activityId: '1',
//                 time: null,
//                 score: null,
//                 status: 'pending', // activityAttemptStatus: pending, inProgess, done
//             },
//             '2': {
//                 userId: 'me',
//                 activityId: '2',
//                 time: 0,
//                 score: 0,
//                 status: 'inProgess', // activityAttemptStatus: pending, inProgess, done
//             },
//             '3': {
//                 userId: 'me',
//                 activityId: '3',
//                 time: 300, // s
//                 score: 100,
//                 status: 'done', // activityAttemptStatus: pending, inProgess, done
//             }
//         }
//     },
//     app: {
//         currentCourseId: '1',
//         activity: {
//             currentActivityId: '2',
//             currentActivityAttempt: {
//                 userId: 'me',
//                 activityId: '2',
//                 isPlaying: false,
//                 time: null,
//                 score: null,
//                 status: 'pending',
//                 // activityAttemptStatus: pending, inProgess, done
//             },
//             // exit current activity -> ra phan lua chon activity
//             // exit thi save lai activity attempt
//             // select activity thi load activity attempt

//             // do, redo, doAgain Activity
//             courseActivities: [], // select
//             unitActivities: [], // next, previous, select
//             // suggestActivities: [],
//         },
//     }
// }
export default rootReducer;