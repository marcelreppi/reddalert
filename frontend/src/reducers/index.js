import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import app from "./app"
import user from "./user"

const rootReducer = combineReducers({
  app,
  user,
  routing: routerReducer,
})

export default rootReducer
