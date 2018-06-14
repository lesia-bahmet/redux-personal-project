import { call, put } from 'redux-saga/effects';

import { url, token } from './../../../../config/api';

import { sagaTaskActions } from './../actions';
import { uiActions } from "../../../ui/actions";

export function* callFetchTasksWorkers () {

    try {
        yield put(uiActions.setApiRequestState(true));

        const response = yield call(fetch, `${url}`, {
            method:  'GET',
            headers: {
                Authorization: token,
            },
        });

        const { data: tasks, message } = yield call(
            [response, response.json]
        );

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(sagaTaskActions.fetchTasksSuccess(tasks));
    } catch (error) {
        yield console.error(error);
    } finally {
        yield put(uiActions.setApiRequestState(false));
    }
}
