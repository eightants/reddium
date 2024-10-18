import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "../styles/styles.css";
import { useRouter } from "next/dist/client/router";
import * as gtag from "../functions/gtag";
import CookieBanner from "../components/CookieBanner";
import { H } from "highlight.run";
import { ConfigProvider } from '../lib/ConfigContext'

if (typeof window !== "undefined") {
  H.init("5ldw65eo");
}

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ConfigProvider>
      <div>
        <Component {...pageProps} />
        <CookieBanner />
      </div>
    </ConfigProvider>
  );
};

export default App;
