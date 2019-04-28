import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Unauthenticated from "./pages/Unauthenticated"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"

function Router(routerProps) {
  function PrivateRoute({ component: Component, ...rest }) {
    function render(props) {
      if (
        routerProps.loggedIn === true &&
        props.match.params.mail === routerProps.userEmail
      ) {
        return <Component {...props} />
      } else {
        return <Unauthenticated />
      }
    }

    return <Route {...rest} render={render} />
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

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    userEmail: state.user.email,
  }
}

export default connect(
  mapStateToProps,
  null
)(Router)
