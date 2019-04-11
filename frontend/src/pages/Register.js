import React from "react"

import Layout from "../components/Layout"

import "../styles/Login.css"

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.emailInput = React.createRef()
    this.passwordInput = React.createRef()
    this.handleEnterKey = this.handleEnterKey.bind(this)
  }

  async handleEnterKey(e) {
    if (e.key === "Enter") {
      // await this.submitEmail()
    }
  }

  render() {
    return (
      <Layout>
        <div className="page-title">Get started with Reddalert!</div>
        <div className="login-form">
          <div className="input-title">E-Mail</div>
          <input className="input-text" type="text" name="email" />
          <div className="input-title" style={{ marginTop: "20px" }}>
            Password
          </div>
          <input className="input-text" type="password" name="password" />
          {/* Add another password input to double check the input */}
          <input className="input-submit" type="submit" value="Register" />
        </div>
      </Layout>
    )
  }
}

export default Register
