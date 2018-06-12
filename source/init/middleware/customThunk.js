export const customThunk = (store) => (next) => (action) => {

    console.log('customThunk');
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }

    return next(action);
};
