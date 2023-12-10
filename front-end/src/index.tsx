import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ThorinGlobalStyles, lightTheme } from "@ensdomains/thorin";
import { ThemeProvider } from "styled-components";
import { WagmiConfig } from "wagmi";
import config from "./config/WagmiConfig";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <BrowserRouter>
        <Provider store={store}>
          <WagmiConfig config={config}>
            <App />
          </WagmiConfig>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
