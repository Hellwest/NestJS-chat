import { createGlobalStyle } from "styled-components"
import { normalize } from "styled-normalize"

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html, body {
    magin: 0;
    padding: 0;
    background-color: #87cefa;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`
