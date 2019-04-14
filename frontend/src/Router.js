import React, { useContext } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Unauthenticated from "./pages/Unauthenticated"
import NotFound from "./pages/NotFound"
import { AuthUserContext } from "./Store"

function Router() {
  const { authUser } = useContext(AuthUserContext)

  function isUserAuthenticated() {
    return authUser !== null
  }

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isUserAuthenticated() ? <Component {...props} /> : <Unauthenticated />
        }
      />
    )
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute path="/dashboard/:mail" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
