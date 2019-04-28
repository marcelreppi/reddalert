import React, { useEffect } from "react"
import { useCookies } from "react-cookie"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import axios from "axios"

import { login } from "./reducers/user"
import { setLoading } from "./reducers/app"
import Router from "./Router"

import "./styles/App.css"

function App(props) {
  const [cookies] = useCookies()

  useEffect(() => {
    console.log("Check for session")
    props.setLoading(true)
    // Check if there is still an active session
    if (cookies.session) {
      console.log("Restore session")
      axios
        .get(props.backendUrl + `/session/${cookies.session.sessionId}`)
        .then(({ data }) => {
          props.login(data.email)
          props.setLoading(false)
        })
    }
  }, [cookies.sessionId])

  return (
    <React.Fragment>
      <Router />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    backendUrl: state.app.backendUrl,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setLoading,
      login,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
