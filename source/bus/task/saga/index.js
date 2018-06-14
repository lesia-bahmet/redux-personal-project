import { takeEvery } from 'redux-saga/effects';

import { sagaTypes } from './types';
import { callFetchTasksWorkers } from './workers/fetchTasks';
import { callAddTaskWorkers } from './workers/addTask';
import { callRemoveTaskWorkers } from "./workers/removeTask";
import { callEditTaskWorkers } from "./workers/editTask";

export const tasksWatchers = Object.freeze({
    * watchFetchTasks () {
        yield takeEvery(sagaTypes.FETCH_TASKS_REQUEST, callFetchTasksWorkers);
    },
    * watchAddTask () {
        yield takeEvery(sagaTypes.ADD_TASK_REQUEST, callAddTaskWorkers);
    },
    * watchRemoveTask () {
        yield takeEvery(sagaTypes.REMOVE_TASK_REQUEST, callRemoveTaskWorkers);
    },
    * watchEditTask () {
        yield takeEvery(sagaTypes.EDIT_TASK_REQUEST, callEditTaskWorkers);
    },
});
