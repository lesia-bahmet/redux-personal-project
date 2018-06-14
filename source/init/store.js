import { createStore, applyMiddleware, compose } from 'redux';
import { sagaMiddleware, middleware, dev } from './middleware';

import { rootReducer } from './rootReducer';
import { rootSaga } from "./rootSaga";

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = dev && devtools ? devtools : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
