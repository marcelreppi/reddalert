import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Layout from "../components/Layout"
import SubredditsGrid from "../components/SubredditsGrid"
import SubredditsCards from "../components/SubredditsCards"

import "../styles/Dashboard.css"

function Dashboard(props) {
  console.log(props)
  useEffect(() => {})
  return (
    <Layout>
      <h1>Dashboard</h1>

      <div className="dashboard-email">
        Notifications for
        <h3>{props.match.params.mail}</h3>
      </div>
      <div className="dashboard-subreddits">
        {/* <span>Registered subreddits</span> */}
        {/* <SubredditsGrid subreddits={this.state.subreddits} /> */}
        {/* <SubredditsCards subreddits={this.state.subreddits} /> */}
        {/* <button className="subreddit-button">Add subreddit</button> */}
      </div>
    </Layout>
  )
}

export default Dashboard
