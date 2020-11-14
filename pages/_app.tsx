import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import '../styles/styles.css'
import { useRouter } from 'next/dist/client/router';
import * as gtag from "../functions/gtag";
	
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

  return <Component {...pageProps} />;
};

export default App;