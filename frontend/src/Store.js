import React, { useState, createContext, useEffect } from "react"

export const AuthUserContext = createContext()
export const BackendContext = createContext()

function Store({ children }) {
  const [authUser, setAuthUserState] = useState(null)

  function setAuthUser(value, remember) {
    setAuthUserState(value)

    if (value === null) {
      sessionStorage.removeItem("authUser")
      localStorage.removeItem("authUser")
      return
    }

    sessionStorage.setItem("authUser", value)

    if (remember) {
      localStorage.setItem("authUser", value)
    }
  }

  function isUserAuthenticated() {
    return authUser !== null
  }

  useEffect(() => {
    if (authUser === null) {
      // Check localStorage if a user was remembered
      const prevAuthUser =
        sessionStorage.getItem("authUser") || localStorage.getItem("authUser")
      if (prevAuthUser !== null) {
        setAuthUserState(prevAuthUser)
      }
    }
  })

  return (
    <AuthUserContext.Provider
      value={{ authUser, setAuthUser, isUserAuthenticated }}
    >
      <BackendContext.Provider value={{ url: "http://localhost:3001" }}>
        {children}
      </BackendContext.Provider>
    </AuthUserContext.Provider>
  )
}

export default Store
