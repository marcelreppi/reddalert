import React, { useState, useRef } from "react"
import axios from "axios"
import { connect } from "react-redux"

import Layout from "../components/Layout"
import Form, { Label, TextInput, PasswordInput, SubmitButton } from "../components/Form"
import Alert from "../components/Alert"

function Register(props) {
  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  const confirmedPasswordInput = useRef(null)

  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  async function submitForm(e) {
    console.log("Submit Registration")
    e.preventDefault()
    const email = emailInput.current.value
    const password = passwordInput.current.value
    const confirmedPassword = confirmedPasswordInput.current.value

    const { data } = await axios.post(props.backendUrl + "/register", {
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
      <Form onSubmit={submitForm}>
        <Label>E-Mail</Label>
        <TextInput ref={emailInput} onInput={hideAlert} />
        <Label>Password</Label>
        <PasswordInput ref={passwordInput} onInput={hideAlert} />
        <Label>Confirm Password</Label>
        <PasswordInput ref={confirmedPasswordInput} onInput={hideAlert} />
        <Alert showCondition={showAlert}>{alertMsg}</Alert>
        <SubmitButton value="Register" />
      </Form>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    backendUrl: state.app.backendUrl,
  }
}

export default connect(
  mapStateToProps,
  null
)(Register)
