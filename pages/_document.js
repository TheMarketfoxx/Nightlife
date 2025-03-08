// /pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Viewport Meta Tag for Mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Other head tags like icons or manifest can be included here */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
