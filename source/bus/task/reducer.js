import { List, fromJS } from 'immutable';
import { taskComparator } from './../../instruments/helpers';

import { types } from './types';

const initialState = List();

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TASK:
            return state.unshift(fromJS(action.payload));

        case types.REMOVE_TASK:
            return state.delete(state.findIndex((task) => task.get('id') === action.payload));

        case types.EDIT_TASK:
            return state.updateIn([state.findIndex((task) => task.get('id') === action.payload.taskId)],
                (task) => task.set('message', action.payload.message));

        case types.SET_FAVORITE:
            return state.updateIn([state.findIndex((task) => task.get('id') === action.payload)],
                (task) => task.set('favorite', true));

        case types.UNSET_FAVORITE:
            return state.updateIn([state.findIndex((task) => task.get('id') === action.payload)],
                (task) => task.set('favorite', false));

        case types.SET_COMPLETED:
            return state.updateIn([state.findIndex((task) => task.get('id') === action.payload)],
                (task) => task.set('completed', true));

        case types.SET_UNCOMPLETED:
            return state.updateIn([state.findIndex((task) => task.get('id') === action.payload)],
                (task) => task.set('completed', false));

        case types.SORT_TASKS:
            return state.sort(taskComparator);

        case types.FILTER_TASKS:
            return state.map((task) => task.set('hidden', !task.get('message').includes(action.payload)));

        case types.SET_ALL_TASKS_COMPLETED:
            return state.map((task) => task.set('completed', true));

        default:
            return state;
    }
};
