import React from "react"

import Router from "./Router"
import Store from "./Store"
import Layout from "./components/Layout"

export default () => (
  <Store>
    <Router />
  </Store>
)
