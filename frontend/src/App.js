import React, { useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import axios from "axios"

import { login, setRememberUser, setSubreddits } from "./reducers/user"
import { setLoading } from "./reducers/app"
import Router from "./Router"

import "./styles/App.css"

function App(props) {
  useEffect(() => {
    console.log("Check for session")
    // Check if there is still an active session
    if (localStorage.getItem("sessionId")) {
      console.log("Restore session")
      props.setLoading(true)
      axios
        .get(props.backendUrl + `/session/${localStorage.getItem("sessionId")}`)
        .then(({ data }) => {
          console.log(data)
          props.login(data.email)
          props.setSubreddits(data.subreddits)
          props.setLoading(false)
          // User wanted to be remembered last time so remember him for the next time
          props.setRememberUser(true)
        })
        .catch(e => {
          console.log(e)
          props.setLoading(false)
        })
      return
    }
    props.setLoading(false)
  })

  window.onbeforeunload = e => {
    if (!props.rememberUser) {
      localStorage.removeItem("sessionId")
    }
  }

  return <Router />
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
      setSubreddits,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
