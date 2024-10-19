import React from "react";
import { AppProps } from "next/app";
import "../styles/styles.css";
import { H } from "highlight.run";
import { ConfigProvider } from '../lib/ConfigContext'

if (typeof window !== "undefined") {
  H.init("5ldw65eo");
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ConfigProvider>
      <div>
        <Component {...pageProps} />
      </div>
    </ConfigProvider>
  );
};

export default App;
