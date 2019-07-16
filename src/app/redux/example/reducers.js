import { combineReducers } from 'redux';

import { counterReducer } from './counter/reducers';

const exampleReducer = combineReducers({
    counter: counterReducer
});

export { exampleReducer };