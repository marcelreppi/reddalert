import React, { useState, createContext } from "react"

export const AuthUserContext = createContext()
export const BackendContext = createContext()

const Store = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      <BackendContext.Provider value={{ url: "http://localhost:3001" }}>
        {children}
      </BackendContext.Provider>
    </AuthUserContext.Provider>
  )
}

export default Store
