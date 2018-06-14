import { call, put } from 'redux-saga/effects';

import { url, token } from './../../../../config/api';
import { taskActions } from "../../actions";
import { uiActions } from "../../../ui/actions";

export function* callAddTaskWorkers ({ payload: message }) {

    try {
        yield put(uiActions.setApiRequestState(true));

        const response = yield call(fetch, `${url}`, {
            method:  'POST',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const { data: task, error } = yield call(
            [response, response.json]
        );

        if (response.status !== 200) {
            throw new Error(error);
        }

        yield put(taskActions.addTask(task));
    } catch (error) {
        yield console.error(error);
    } finally {
        yield put(uiActions.setApiRequestState(false));
    }
}
