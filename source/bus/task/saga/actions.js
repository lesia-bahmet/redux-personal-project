import { sagaTypes } from './types';

export const sagaTaskActions = Object.freeze({
    fetchTasksRequest: () => {
        return {
            type: sagaTypes.FETCH_TASKS_REQUEST,
        };
    },
    fetchTasksSuccess: (tasks) => {
        return {
            type:    sagaTypes.FETCH_TASKS_SUCCESS,
            payload: tasks,
        };
    },
    addTaskRequest: (message) => {
        return {
            type:    sagaTypes.ADD_TASK_REQUEST,
            payload: message,
        };
    },
    removeTaskRequest: (id) => {
        return {
            type:    sagaTypes.REMOVE_TASK_REQUEST,
            payload: id,
        };
    },
    editTasksRequest: (task) => {
        return {
            type:    sagaTypes.EDIT_TASK_REQUEST,
            payload: task,
        };
    },
});
