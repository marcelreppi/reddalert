import React from "react"
import { Link } from "react-router-dom"

import Layout from "../components/Layout"

export default () => {
  return (
    <Layout>
      <div>Error 404: Page not found!</div>
      <div>
        <p>Whoops!</p>
        <p>
          I don't know what you did there but I know what you should definitely
          do:
        </p>
        <p>
          Subscribe to{" "}
          <a href="https://www.youtube.com/user/PewDiePie">PewDiePie</a>
        </p>
      </div>
      <div>
        Or just go back to the <Link to="/">homepage</Link>
      </div>
    </Layout>
  )
}
