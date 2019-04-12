import React, { Component } from "react"

import Layout from "../components/Layout"

class Home extends Component {
  render() {
    return (
      <Layout>
        <div class="page-title">Reddalert</div>
        <p>Create your custom notifications for reddit today!</p>
        <p>Login or register in a couple of steps!</p>
      </Layout>
    )
  }
}

export default Home
