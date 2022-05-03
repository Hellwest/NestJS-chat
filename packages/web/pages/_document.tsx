/* eslint-disable filenames/match-regex */
import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"
import React, { ReactElement } from "react"

class Document extends NextDocument<DocumentProps> {
  static async getInitialProps(
    context: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps(context)

    return { ...initialProps }
  }

  render(): ReactElement {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
