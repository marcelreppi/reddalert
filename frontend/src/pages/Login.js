import React, { useState, useContext } from "react"
import axios from "axios"

import { AuthUserContext, BackendContext } from "../Store"
import Layout from "../components/Layout"
import Alert from "../components/Alert"

import "../styles/Login.css"

function Login(props) {
  const emailInput = React.createRef()
  const passwordInput = React.createRef()

  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  const { setAuthUser } = useContext(AuthUserContext)
  const { url: backendURL } = useContext(BackendContext)

  async function handleEnterKey(e) {
    if (e.key === "Enter") {
      await submitForm()
    }
  }

  async function submitForm() {
    console.log("Submit Login")

    const email = emailInput.current.value.toLowerCase()
    const password = passwordInput.current.value

    const { data } = await axios.post(backendURL + "/login", {
      email,
      password,
    })

    if (data.error) {
      setAlertMsg(data.error.msg)
      setShowAlert(true)
      setTimeout(hideAlert, 3000)
      return
    }

    hideAlert()

    // Set authorized user
    setAuthUser(data.user.email)

    // Redirect to dashboard
    props.history.push(`/dashboard/${data.user.email}`)
  }

  function hideAlert() {
    setShowAlert(false)
  }

  return (
    <Layout>
      <div className="page-title">Log in to Reddalert!</div>
      <div className="login-form">
        <div className="input-container">
          <div className="input-title">E-Mail</div>
          <input
            className="input-text"
            type="text"
            ref={emailInput}
            onKeyPress={handleEnterKey}
            onInput={hideAlert}
          />
          <div className="input-title">Password</div>
          <input
            className="input-text"
            type="password"
            ref={passwordInput}
            onKeyPress={handleEnterKey}
            onInput={hideAlert}
          />
          <Alert
            styleClass="alert"
            showCondition={showAlert}
            alert={alertMsg}
          />
          <input
            className="input-submit"
            type="submit"
            value="Log in"
            onClick={submitForm}
          />
        </div>
        <div className="color-line" />
      </div>
    </Layout>
  )
}

export default Login
