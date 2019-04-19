import React, { createContext } from "react"
import { CookiesProvider } from "react-cookie"

import AuthUserProvider from "./contexts/AuthUserProvider"
import AppProvider from "./contexts/AppProvider"

function Store({ children }) {
  return (
    <AppProvider>
      <CookiesProvider>
        <AuthUserProvider>{children}</AuthUserProvider>
      </CookiesProvider>
    </AppProvider>
  )
}

export default Store
