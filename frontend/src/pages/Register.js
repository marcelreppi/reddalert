import React, { useState, useContext } from "react"
import axios from "axios"

import { AppContext } from "../contexts/AppProvider"
import Layout from "../components/Layout"
import Alert from "../components/Alert"

import "../styles/Login.css"

function Register() {
  const emailInput = React.createRef()
  const passwordInput = React.createRef()
  const confirmedPasswordInput = React.createRef()

  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  async function handleEnterKey(e) {
    if (e.key === "Enter") {
      await submitForm()
    }
  }

  async function submitForm() {
    console.log("Submit Registration")

    const { backendURL } = useContext(AppContext)
    const email = emailInput.current.value
    const password = passwordInput.current.value
    const confirmedPassword = confirmedPasswordInput.current.value

    const { data } = await axios.post(backendURL + "/register", {
      email,
      password,
      confirmedPassword,
    })

    if (data.error) {
      setAlertMsg(data.error.msg)
      setShowAlert(true)
      setTimeout(hideAlert, 3000)
      return
    }

    hideAlert()

    emailInput.current.value = ""
    passwordInput.current.value = ""
    confirmedPasswordInput.current.value = ""

    setAlertMsg("Registration was successful! You can now log in!")
    setShowAlert(true)
  }

  function hideAlert() {
    setShowAlert(false)
  }

  return (
    <Layout>
      <div className="page-title">Get started with Reddalert!</div>
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
          <div className="input-title">Confirm Password</div>
          <input
            className="input-text"
            type="password"
            ref={confirmedPasswordInput}
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
            value="Register"
            onClick={submitForm}
          />
        </div>
        <div className="color-line" />
      </div>
    </Layout>
  )
}

export default Register
