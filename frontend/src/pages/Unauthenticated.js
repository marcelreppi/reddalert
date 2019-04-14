import React from "react"
import { Link } from "react-router-dom"

import Layout from "../components/Layout"

const Unauthenticated = () => (
  <Layout>
    <h3>Access denied! You must be authenticated to see this view!</h3>
    <h3>
      Please <Link to="/login">log in</Link> first!
    </h3>
  </Layout>
)

export default Unauthenticated
