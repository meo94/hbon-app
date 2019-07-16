import { combineReducers } from 'redux';

import { exampleReducer } from './example/reducers';
import { authUserReducer } from './session/reducers';

import { createFirebaseReducer } from './shared/firebaseReducers';

const domainReducer = combineReducers({
    messages: createFirebaseReducer(),
    samples: createFirebaseReducer(),
});

const rootReducer = combineReducers({
    example: exampleReducer,
    authUser: authUserReducer,
    domain: domainReducer,
});

export default rootReducer;