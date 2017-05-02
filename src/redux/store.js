import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import task from './modules/task'

const middleware = [thunk]

if (process.env.NODE_ENV !== 'production') middleware.push(createLogger())

const store = createStore(combineReducers({ task }), applyMiddleware(...middleware))

export default store
