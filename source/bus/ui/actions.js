import { types } from './types';

export const uiActions = Object.freeze({
    setApiRequestState: (apiRequestState) => {
        return {
            type:    types.SET_API_REQUEST_STAE,
            payload: apiRequestState,
        };
    },
});
