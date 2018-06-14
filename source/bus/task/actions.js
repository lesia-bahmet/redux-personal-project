import { types } from './types';

export const taskActions = Object.freeze({
    addTask: (task) => ({
        type:    types.ADD_TASK,
        payload: task,
    }),
    removeTask: (taskId) => ({
        type:    types.REMOVE_TASK,
        payload: taskId,
    }),
    editTask: (task) => ({
        type:    types.EDIT_TASK,
        payload: { task },
    }),
    editAllTasks: (tasks) => ({
        type:    types.EDIT_ALL_TASKS,
        payload: tasks,
    }),
    sortTasks: () => ({
        type: types.SORT_TASKS,
    }),
    filterTasks: (mask) => ({
        type:    types.FILTER_TASKS,
        payload: mask,
    }),
});
