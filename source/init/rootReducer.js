// Core
import { combineReducers } from 'redux';

// Reducers
import { taskReducer as tasks } from '../bus/task/reducer';
import { uiReducer as ui } from '../bus/ui/reducer';

export const rootReducer = combineReducers({
    tasks,
    ui,
});
