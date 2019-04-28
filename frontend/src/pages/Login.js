import React, { useState, useContext, useRef } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"

import { AppContext } from "../contexts/AppProvider"
import { AuthUserContext } from "../contexts/AuthUserProvider"
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

  const [, setCookie] = useCookies()
  const { setAuthUser, setRememberUser } = useContext(AuthUserContext)
  const { backendURL } = useContext(AppContext)

  async function submitForm(e) {
    console.log("Submit Login")
    e.preventDefault()
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
    setRememberUser(rememberCheckBox.current.checked)

    // Set authorized user
    setAuthUser(data.user.email)
    setCookie("session", {
      sessionId: data.sessionId,
      authUser: data.user.email,
    })

    // Redirect to dashboard
    props.history.push(`/dashboard/${data.user.email}`)
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

export default Login
