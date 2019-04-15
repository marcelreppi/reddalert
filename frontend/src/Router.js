import React, { useContext } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Unauthenticated from "./pages/Unauthenticated"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"
import { AuthUserContext } from "./Store"

function Router() {
  const { authUser, isUserAuthenticated } = useContext(AuthUserContext)

  function PrivateRoute({ component: Component, ...rest }) {
    function routeIsAllowed(props) {
      return isUserAuthenticated() && props.match.params.mail === authUser
    }

    return (
      <Route
        {...rest}
        render={props =>
          routeIsAllowed(props) ? <Component {...props} /> : <Unauthenticated />
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
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/privacy" component={PrivacyPolicy} />
        <PrivateRoute path="/dashboard/:mail" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
