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
    this.submitEmail = this.submitEmail.bind(this)
    this.handleEnterKey = this.handleEnterKey.bind(this)
    this.hideAlerts = this.hideAlerts.bind(this)
  }

  state = {
    redirect: false,
    redirectPath: `/dashboard/lol`,
    redirectState: {},
    emptyFields: false,
  }

  async handleEnterKey(e) {
    if (e.key === "Enter") {
      await this.submitEmail()
    }
  }

  hideAlerts() {
    this.setState({ emptyFields: false })
  }

  showEmptyFieldsAlert() {
    this.setState({ emptyFields: true })
  }

  async submitEmail() {
    console.log("submit email")
    const backendURL = "http://localhost:3001"
    const email = this.emailInput.current.value.toLowerCase()
    const password = this.passwordInput.current.value
    console.log(email, password)

    if (email === "" || password === "") {
      this.showEmptyFieldsAlert()
    }

    // const { data } = await axios.get(backendURL + `/login`)
    // if (data.length === 0) {
    //   console.log("No data found, sorry!")
    // } else {
    //   this.setRedirect(email, data)
    // }
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
            <Alert
              styleClass="password-alert"
              showCondition={this.state.emptyFields}
              alert="Please fill out all fields!"
            />
            <input
              className="input-submit"
              type="submit"
              value="Log in"
              onClick={this.submitEmail}
            />
          </div>
          <div className="color-line" />
        </div>
      </Layout>
    )
  }
}

export default Home
