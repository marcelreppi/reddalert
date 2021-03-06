import React, { useState, useRef } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { login, setRememberUser, setSubreddits } from "../reducers/user"
import Layout from "../components/Layout"
import Form, {
  Label,
  TextInput,
  PasswordInput,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
  SubmitButton,
} from "../components/Form"
import Alert from "../components/Alert"

function Login(props) {
  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  const rememberCheckBox = useRef(null)

  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  async function submitForm(e) {
    console.log("Submit Login")
    e.preventDefault()
    const email = emailInput.current.value.toLowerCase()
    const password = passwordInput.current.value

    const { data } = await axios.post(props.backendUrl + "/login", {
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
    props.setRememberUser(rememberCheckBox.current.checked)
    console.log(data)
    // Set authorized user
    props.login(data.user.email)
    props.setSubreddits(data.user.subreddits)
    localStorage.setItem("sessionId", data.sessionId)

    // Redirect to dashboard
    props.history.push(`/dashboard`)
  }

  function hideAlert() {
    setShowAlert(false)
  }

  return (
    <Layout>
      <div className="page-title">Log in to Reddalert!</div>
      <Form onSubmit={submitForm}>
        <Label>E-Mail</Label>
        <TextInput ref={emailInput} onInput={hideAlert} />
        <Label>Password</Label>
        <PasswordInput ref={passwordInput} onInput={hideAlert} />
        <CheckboxContainer>
          <CheckboxInput id="remember" ref={rememberCheckBox} />
          <CheckboxLabel htmlFor="remember">Stay logged in?</CheckboxLabel>
        </CheckboxContainer>
        <Alert showCondition={showAlert}>{alertMsg}</Alert>
        <SubmitButton value="Log in" />
      </Form>
    </Layout>
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
      setRememberUser,
      login,
      setSubreddits,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
