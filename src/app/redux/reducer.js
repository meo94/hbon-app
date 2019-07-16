import { combineReducers } from 'redux';
import { nestedCombineReducers } from 'nested-combine-reducers';

import { exampleReducer } from './example/reducers';
import { authUserReducer } from './session/reducers';
import { setValueByDotKey } from './shared/utils';

import { MESSAGES_NODE_STATE, messagesDomainReducer } from './messages';

const registerReducerObject = {};
setValueByDotKey(registerReducerObject, MESSAGES_NODE_STATE, messagesDomainReducer);

const rootReducer = nestedCombineReducers({
    example: exampleReducer,
    authUser: authUserReducer,
    ...registerReducerObject,
}, combineReducers);

export default rootReducer;