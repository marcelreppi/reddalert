import React from "react"
import ReactDOM from "react-dom"

import Router from "./Router"
import Store from "./Store"

import "./styles/index.css"

ReactDOM.render(
  <Store>
    <Router />
  </Store>,
  document.getElementById("root")
)
