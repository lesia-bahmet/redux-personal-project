import { createStore, applyMiddleware, compose } from 'redux';
import { middleware, dev } from './middleware';

import { rootReducer } from './rootReducer';

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = dev && devtools ? devtools : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
