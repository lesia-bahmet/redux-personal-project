// Core
import { combineReducers } from 'redux';

// Reducers
import { taskReducer as tasks } from '../bus/task/reducer';

export const rootReducer = combineReducers({
    tasks,
});
