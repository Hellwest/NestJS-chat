/* eslint-disable filenames/match-regex */
import { default as NextApp, AppProps } from "next/app"
import React, { Fragment, ReactElement } from "react"
import { GlobalStyle } from "../theme/theme"

class App extends NextApp<AppProps> {
  render(): ReactElement {
    const { Component, pageProps } = this.props

    return (
      <Fragment>
        <Component {...pageProps} />
        <GlobalStyle />
      </Fragment>
    )
  }
}

export default App
