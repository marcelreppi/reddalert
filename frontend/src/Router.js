import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/dashboard/:mail" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Router
