import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { ApolloProvider } from "@apollo/react-hooks"
import { ThemeProvider } from "@material-ui/styles"
import { typeDefs } from "./resolvers"
import AppTheme from "./theme"
import "./index.css"
import { getAuthToken, isAuthenticated } from "./authentication"
import { SecureApp } from "./SecureApp"

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: "http://localhost:4000",
  headers: {
    authorization: getAuthToken()
  }
})

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers: {}
})

cache.writeData({
  data: {
    isLoggedIn: isAuthenticated()
  }
})

ReactDOM.render(
  <ThemeProvider theme={AppTheme}>
    <ApolloProvider client={client}>
      <SecureApp />
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
