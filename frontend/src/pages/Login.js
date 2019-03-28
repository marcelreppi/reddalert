import React from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"

import Layout from "../components/Layout"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.emailInput = React.createRef()
    this.submitEmail = this.submitEmail.bind(this)
    this.handleEnterKey = this.handleEnterKey.bind(this)

    this.state = {
      redirect: false,
      redirectPath: `/dashboard/lol`,
      redirectState: {},
    }
  }

  async handleEnterKey(e) {
    if (e.key === "Enter") {
      await this.submitEmail()
    }
  }

  async submitEmail() {
    console.log("submit email")
    const backendURL = "http://localhost:3001"
    const inputEmail = this.emailInput.current.value.toLowerCase()
    const { data } = await axios.get(backendURL + `/user/${inputEmail}`)
    if (data.length === 0) {
      console.log("No data found, sorry!")
    } else {
      this.setRedirect(inputEmail, data)
    }
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
        <h1>Reddalert</h1>
        <p>Welcome to reddalert</p>
        <div>
          <input
            type="text"
            placeholder="E-Mail address"
            ref={this.emailInput}
            onKeyPress={this.handleEnterKey}
          />
          <input type="submit" value="Submit" onClick={this.submitEmail} />
        </div>
      </Layout>
    )
  }
}

export default Home
