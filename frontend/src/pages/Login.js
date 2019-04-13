import React from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"

import Layout from "../components/Layout"
import Alert from "../components/Alert"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.emailInput = React.createRef()
    this.passwordInput = React.createRef()
    this.handleEnterKey = this.handleEnterKey.bind(this)
    this.hideAlert = this.hideAlert.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  state = {
    redirect: false,
    redirectPath: `/dashboard/lol`,
    redirectState: {},
    showAlert: false,
    alertMsg: "",
  }

  async handleEnterKey(e) {
    if (e.key === "Enter") {
      await this.submitForm()
    }
  }

  async submitForm() {
    console.log("submit login")
    const backendURL = "http://localhost:3001"
    const email = this.emailInput.current.value.toLowerCase()
    const password = this.passwordInput.current.value

    const { data } = await axios.post(backendURL + "/login", {
      email,
      password,
    })

    if (data.errors) {
      this.setState({ alertMsg: data.errors[0].msg, showAlert: true })
      return
    }

    this.hideAlert()
  }

  hideAlert() {
    this.setState({ showAlert: false })
  }

  setRedirect = (email, data) => {
    this.setState({
      redirect: true,
      redirectPath: `/dashboard/${email}`,
      redirectState: { data },
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirectPath,
            state: this.state.redirectState,
          }}
        />
      )
    }
  }

  render() {
    return (
      <Layout>
        {this.renderRedirect()}
        <div className="page-title">Log in to Reddalert!</div>
        <div className="login-form">
          <div className="input-container">
            <div className="input-title">E-Mail</div>
            <input
              className="input-text"
              type="text"
              ref={this.emailInput}
              onKeyPress={this.handleEnterKey}
              onInput={this.hideAlert}
            />
            <div className="input-title">Password</div>
            <input
              className="input-text"
              type="password"
              ref={this.passwordInput}
              onKeyPress={this.handleEnterKey}
              onInput={this.hideAlert}
            />
            <Alert
              styleClass="alert"
              showCondition={this.state.showAlert}
              alert={this.state.alertMsg}
            />
            <input
              className="input-submit"
              type="submit"
              value="Log in"
              onClick={this.submitForm}
            />
          </div>
          <div className="color-line" />
        </div>
      </Layout>
    )
  }
}

export default Home
