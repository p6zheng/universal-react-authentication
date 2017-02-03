import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers/index'

export const configureStore = () => {
  // Promise middlware
  const middlewares = [thunk]

  // Conditionally apply logging middlware when not in production
  if (process.env.NODE_ENV !== 'production' && typeof(window) !== 'undefined') middlewares.push(createLogger())

  // Create store
  return createStore(
    reducer,
    applyMiddleware(...middlewares),
  )
}
