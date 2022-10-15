import "../styles/main.scss";
import React from "react";
import { Router } from "next/router";
import NProgress from "nprogress";
import background from "../public/images/background.svg";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const start = () => NProgress.start();
    const end = () => NProgress.start();
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  });
  return <Component {...pageProps} />;
}

export default MyApp;