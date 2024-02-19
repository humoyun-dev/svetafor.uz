import "@/styles/globals.css";
import "nprogress/nprogress.css"; // styles of the progress bar
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Router } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";

// NProgress configuration
NProgress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 500,
  minimum: 0.3,
  trickleSpeed: 800,
});

// Binding NProgress to the Router events
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Cleanup the events listener when the component is unmounted
    return () => {
      Router.events.off("routeChangeStart", () => NProgress.start());
      Router.events.off("routeChangeComplete", () => NProgress.done());
      Router.events.off("routeChangeError", () => NProgress.done());
    };
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
