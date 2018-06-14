import { call, put } from 'redux-saga/effects';

import { url, token } from './../../../../config/api';
import { taskActions } from "../../actions";
import { uiActions } from "../../../ui/actions";

export function* callRemoveTaskWorkers ({ payload: taskId }) {

    try {
        yield put(uiActions.setApiRequestState(true));

        const response = yield call(fetch, `${url}/${taskId}`, {
            method:  'DELETE',
            headers: {
                Authorization: token,
            },
        });

        if (response.status !== 204) {
            const { data: error } = yield call(
                [response, response.json]
            );

            throw new Error(error);
        }

        yield put(taskActions.removeTask(taskId));
    } catch (error) {
        yield console.error(error);
    } finally {
        yield put(uiActions.setApiRequestState(false));
    }
}
