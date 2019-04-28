import React, { useState, useContext, useRef } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import styled from "styled-components"

import { AppContext } from "../contexts/AppProvider"
import { AuthUserContext } from "../contexts/AuthUserProvider"
import Layout from "../components/Layout"
import Alert from "../components/Alert"
import ColorLine from "../components/ColorLine"

const FormContainer = styled.div`
  -webkit-box-shadow: 0px 0px 17px 1px rgba(214, 214, 214, 1);
  -moz-box-shadow: 0px 0px 17px 1px rgba(214, 214, 214, 1);
  box-shadow: 0px 0px 17px 1px rgba(214, 214, 214, 1);
  width: 400px;
  margin: 30px auto;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 30px;
`

const Label = styled.label`
  text-align: left;
  margin-bottom: 5px;
  &:nth-child(n + 2) {
    margin-top: 20px;
  }
`

const TextInput = styled.input.attrs({
  type: "text",
})`
  height: 40px;
  border: 1px black solid;
  border-radius: 5px;
  padding: 0px 10px;
  font-size: 16px;
`

const PasswordInput = styled(TextInput).attrs({
  type: "password",
})``

const CheckboxContainer = styled.div`
  text-align: left;
  margin-bottom: 5px;
  margin-top: 10px;
`

const CheckboxInput = styled.input.attrs({
  type: "checkbox",
})`
  margin-right: 10px;
`

const CheckboxLabel = styled.label`
  &:hover {
    cursor: pointer;
  }
`

const SubmitButton = styled.input.attrs({
  type: "submit",
})`
  margin: 30px auto;
  height: 50px;
  width: 200px;
  border-radius: 5px;
  border: 0px;
  background: #df0336;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  color: white;
`

function Login(props) {
  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  const rememberCheckBox = useRef(null)
  const loginForm = useRef(null)

  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  const [cookies, setCookie] = useCookies()
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

    loginForm.current.reset()

    // Redirect to dashboard
    props.history.push(`/dashboard/${data.user.email}`)
  }

  function hideAlert() {
    setShowAlert(false)
  }

  return (
    <Layout>
      <div className="page-title">Log in to Reddalert!</div>
      <FormContainer>
        <Form ref={loginForm} onSubmit={submitForm}>
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
        <ColorLine />
      </FormContainer>
    </Layout>
  )
}

export default Login
