// import React from "react"
// import { CookiesProvider } from "react-cookie"

// import AuthUserProvider from "./contexts/AuthUserProvider"
// import AppProvider from "./contexts/AppProvider"

// function Store({ children }) {
//   return (
//     <AppProvider>
//       <CookiesProvider>
//         <AuthUserProvider>{children}</AuthUserProvider>
//       </CookiesProvider>
//     </AppProvider>
//   )
// }

// export default Store

import { createStore, compose } from "redux"

// import root reducer
import rootReducer from "./reducers/index"

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, enhancers)

if (module.hot) {
  module.hot.accept("./reducers/", () => {
    const nextRootReducer = require("./reducers/index").default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
