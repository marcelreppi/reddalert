import React from "react"

import Layout from "../components/Layout"
import Alert from "../components/Alert"

import "../styles/Login.css"

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.emailInput = React.createRef()
    this.passwordInput = React.createRef()
    this.repeatedPasswordInput = React.createRef()
    this.handleEnterKey = this.handleEnterKey.bind(this)
    this.hideAlerts = this.hideAlerts.bind(this)
  }

  state = {
    passwordsMatch: true,
    emptyFields: false,
  }

  async handleEnterKey(e) {
    if (e.key === "Enter") {
      await this.submitForm()
    }
  }

  async submitForm() {
    console.log("submit registration")
    const backendURL = "http://localhost:3001"
    const email = this.emailInput.current.value.toLowerCase()
    const password = this.passwordInput.current.value
    const repeatedPassword = this.repeatedPasswordInput.current.value

    if (email === "" || password === "" || repeatedPassword === "") {
      this.showEmptyFieldsAlert()
    }

    if (password !== repeatedPassword) {
      this.showPasswordAlert()
    }

    console.log(email, password, repeatedPassword)
  }

  hideAlerts() {
    this.setState({ emptyFields: false, passwordsMatch: true })
  }

  showEmptyFieldsAlert() {
    this.setState({ emptyFields: true })
  }

  showPasswordAlert() {
    this.setState({ passwordsMatch: false })
  }

  render() {
    return (
      <Layout>
        <div className="page-title">Get started with Reddalert!</div>
        <div className="login-form">
          <div className="input-container">
            <div className="input-title">E-Mail</div>
            <input
              className="input-text"
              type="text"
              ref={this.emailInput}
              onKeyPress={this.handleEnterKey}
              onInput={this.hideAlerts}
            />
            <div className="input-title">Password</div>
            <input
              className="input-text"
              type="password"
              ref={this.passwordInput}
              onKeyPress={this.handleEnterKey}
              onInput={this.hideAlerts}
            />
            <div className="input-title">Repeat Password</div>
            <input
              className="input-text"
              type="password"
              ref={this.repeatedPasswordInput}
              onKeyPress={this.handleEnterKey}
              onInput={this.hideAlerts}
            />
            <Alert
              styleClass="password-alert"
              showCondition={!this.state.passwordsMatch}
              alert="Passwords don't match!"
            />
            <Alert
              styleClass="password-alert"
              showCondition={this.state.emptyFields}
              alert="Please fill out all fields!"
            />
            <input className="input-submit" type="submit" value="Register" />
          </div>
          <div className="color-line" />
        </div>
      </Layout>
    )
  }
}

export default Register
