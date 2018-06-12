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
    editTask: ({ taskId, message }) => ({
        type:    types.EDIT_TASK,
        payload: { taskId, message },
    }),
    setFavorite: (taskId) => ({
        type:    types.SET_FAVORITE,
        payload: taskId,
    }),
    unsetFavorite: (taskId) => ({
        type:    types.UNSET_FAVORITE,
        payload: taskId,
    }),
    setCompleted: (taskId) => ({
        type:    types.SET_COMPLETED,
        payload: taskId,
    }),
    setUncompleted: (taskId) => ({
        type:    types.SET_UNCOMPLETED,
        payload: taskId,
    }),
    sortTasks: () => ({
        type: types.SORT_TASKS,
    }),
    setAllTasksCompleted: () => ({
        type: types.SET_ALL_TASKS_COMPLETED,
    }),
    filterTasks: (mask) => ({
        type:    types.FILTER_TASKS,
        payload: mask,
    }),
});
