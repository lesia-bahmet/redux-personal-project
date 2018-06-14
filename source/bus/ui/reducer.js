import { Map } from 'immutable';

import { types } from './types';

const initialState = Map({
    isRequesting: false,
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_API_REQUEST_STAE:
            return state.set('isRequesting', action.payload);

        default:
            return state;
    }
};
