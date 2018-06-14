import { all } from 'redux-saga/effects';

import { tasksWatchers } from './../bus/task/saga';

export function* rootSaga () {
    yield all([
        tasksWatchers.watchFetchTasks(),
        tasksWatchers.watchAddTask(),
        tasksWatchers.watchRemoveTask(),
        tasksWatchers.watchEditTask()
    ]);
}
