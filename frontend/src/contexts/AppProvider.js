import React, { createContext, useState } from "react"

export const AppContext = createContext()

function AppProvider({ children }) {
  const backendURL = "http://localhost:3001"

  const [loading, setLoading] = useState(false)

  return (
    <AppContext.Provider
      value={{
        backendURL,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
