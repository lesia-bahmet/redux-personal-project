import { call, put } from 'redux-saga/effects';

import { url, token } from './../../../../config/api';
import { taskActions } from "../../actions";
import { uiActions } from "../../../ui/actions";

export function* callEditTaskWorkers ({ payload: tasks }) {

    try {
        yield put(uiActions.setApiRequestState(true));

        const response = yield call(fetch, `${url}`, {
            method:  'PUT',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tasks),
        });

        const { data: message, error } = yield call(
            [response, response.json]
        );

        if (response.status !== 200) {
            throw new Error(error);
        }

        if (message.length === 1) {
            yield put(taskActions.editTask(message[0]));
        } else {
            yield put(taskActions.editAllTasks(message));
        }
    } catch (error) {
        yield console.error(error);
    } finally {
        yield put(uiActions.setApiRequestState(false));
    }
}
