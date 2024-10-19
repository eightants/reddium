import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "../styles/styles.css";
import { H } from "highlight.run";
import { ConfigProvider } from '../lib/ConfigContext'
import { useConfig } from '../functions/useConfig'; 

if (typeof window !== "undefined") {
  H.init("5ldw65eo");
}

const App = ({ Component, pageProps }: AppProps) => {
  const { config } = useConfig();

  useEffect(() => {
    if (config && config.REDDIUM_THEME) {
      document.documentElement.setAttribute('data-theme', config.REDDIUM_THEME);
    }
  }, [config]);

  return (
    <ConfigProvider>
      <div>
        <Component {...pageProps} />
      </div>
    </ConfigProvider>
  );
};

export default App;
