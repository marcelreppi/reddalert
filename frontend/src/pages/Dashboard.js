import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Layout from "../components/Layout"
import SubredditsGrid from "../components/SubredditsGrid"
import SubredditsCards from "../components/SubredditsCards"

import "../styles/Dashboard.css"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subreddits: [],
    }
  }

  async fetchData() {
    const backendURL = "http://localhost:3001"
    const pathEmail = this.props.match.params.mail
    const { data } = await axios.get(backendURL + `/user/${pathEmail}`)
    if (data.length > 0) {
      this.setState({
        subreddits: data,
      })
    }
  }

  async componentWillMount() {
    if (this.props.location.state) {
      // Came here from redirect
      this.setState({
        subreddits: this.props.location.state.data,
      })
    } else {
      // Came here from URL
      await this.fetchData()
    }
  }

  render() {
    return (
      <Layout>
        <h1>Dashboard</h1>

        <div className="dashboard-email">
          Notifications for
          <h3>{this.props.match.params.mail}</h3>
        </div>
        <div className="dashboard-subreddits">
          <span>Registered subreddits</span>
          {/* <SubredditsGrid subreddits={this.state.subreddits} /> */}
          <SubredditsCards subreddits={this.state.subreddits} />
          <button className="subreddit-button">Add subreddit</button>
        </div>
        <br />
        <Link to="/">Home</Link>
      </Layout>
    )
  }
}

export default Dashboard
