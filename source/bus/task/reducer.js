import { List, fromJS } from 'immutable';
import { taskComparator } from './../../instruments/helpers';

import { types } from './types';
import { sagaTypes } from "./saga/types";

const initialState = List();

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case sagaTypes.FETCH_TASKS_SUCCESS:
            return fromJS(action.payload);

        case types.ADD_TASK:
            return state.unshift(fromJS(action.payload));

        case types.REMOVE_TASK:
            return state.delete(state.findIndex((task) => task.get('id') === action.payload));

        case types.EDIT_TASK:
            return state.updateIn([state.findIndex((task) => task.get('id') === action.payload.task.id)],
                (task) => task.merge(action.payload.task));

        case types.SORT_TASKS:
            return state.sort(taskComparator);

        case types.FILTER_TASKS:
            return state.map((task) => task.set('hidden', !task.get('message').includes(action.payload)));

        case types.EDIT_ALL_TASKS:
            // return state.map((task) => task.set('completed', true));
            return fromJS(action.payload);

        default:
            return state;
    }
};
