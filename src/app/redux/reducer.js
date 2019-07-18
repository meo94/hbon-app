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
import { createDomainReducer } from './shared/domain';

const registerReducerObject = {};
setValueByDotKey(registerReducerObject, MESSAGES_NODE_STATE, messagesDomainReducer);
setValueByDotKey(registerReducerObject, 'domain.activities', activityDomainReducer);
setValueByDotKey(registerReducerObject, 'domain.activityAttempts', activityAttemptDomainReducer);

setValueByDotKey(registerReducerObject, 'app.activity', activityAppReducer);
// base domain
setValueByDotKey(registerReducerObject, 'domain.cities', createDomainReducer('domain.cities'));
// setValueByDotKey(registerReducerObject, 'domain.districts', createDomainReducer('domain.districts'));
// setValueByDotKey(registerReducerObject, 'domain.wards', createDomainReducer('domain.wards'));

const rootReducer = nestedCombineReducers({
    example: exampleReducer,
    authUser: authUserReducer,
    ...registerReducerObject,
}, combineReducers);

export default rootReducer;