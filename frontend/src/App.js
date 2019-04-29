import React, { useEffect } from "react"
import Cookies from "universal-cookie"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import axios from "axios"

import { login, setRememberUser } from "./reducers/user"
import { setLoading } from "./reducers/app"
import Router from "./Router"

import "./styles/App.css"

function App(props) {
  const cookies = new Cookies()
  console.log(cookies.getAll())

  useEffect(() => {
    console.log("Check for session")
    // Check if there is still an active session
    if (cookies.get("session")) {
      console.log("Restore session")
      props.setLoading(true)
      axios
        .get(props.backendUrl + `/session/${cookies.get("session").sessionId}`)
        .then(({ data }) => {
          props.login(data.email)
          props.setLoading(false)
          // User wanted to be remembered last time so remember him for the next time
          props.setRememberUser(true)
        })
      return
    }
    props.setLoading(false)
  }, [cookies.sessionId])

  window.onbeforeunload = e => {
    if (!props.rememberUser) {
      cookies.remove("session")
    }
  }

  return (
    <React.Fragment>
      <Router />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    backendUrl: state.app.backendUrl,
    rememberUser: state.user.rememberUser,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setLoading,
      login,
      setRememberUser,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
