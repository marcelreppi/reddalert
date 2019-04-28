import React from "react"
import { Provider } from "react-redux"

import Router from "./Router"
import store from "./store"

import "./styles/App.css"

export default () => (
  <Provider store={store}>
    <Router />
  </Provider>
)
