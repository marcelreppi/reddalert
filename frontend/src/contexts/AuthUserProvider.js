import React, { createContext, useState, useEffect, useContext } from "react"
import { useCookies } from "react-cookie"
import axios from "axios"

import { AppContext } from "./AppProvider"

export const AuthUserContext = createContext()

function AuthUserProvider({ children }) {
  const [authUser, setAuthUser] = useState(null)
  const [rememberUser, setRememberUser] = useState(false)

  const { backendURL, setLoading } = useContext(AppContext)

  const [cookies] = useCookies()

  function isUserAuthenticated() {
    return cookies.session !== undefined
  }

  useEffect(() => {
    console.log("Check for session")
    setLoading(true)
    // Check if there is still an active session
    if (cookies.session) {
      console.log("Restore session")
      axios
        .get(backendURL + `/session/${cookies.session.sessionId}`)
        .then(({ data }) => {
          setAuthUser(data.email)
          setLoading(false)
        })
    }
  }, [cookies.sessionId])

  return (
    <AuthUserContext.Provider
      value={{
        authUser,
        setAuthUser,
        isUserAuthenticated,
        rememberUser,
        setRememberUser,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  )
}

export default AuthUserProvider
