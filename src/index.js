import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/font.css";
import "@suiet/wallet-kit/style.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import {
  AllDefaultWallets,
  defineStashedWallet,
  WalletProvider,
} from "@suiet/wallet-kit";
import { GlobalProvider } from "./Hook/GlobalProvider";
import { Toaster } from "react-hot-toast";
import {
  Chain,
  SuiDevnetChain,
  SuiTestnetChain,
  SuiMainnetChain,
  DefaultChains,
} from "@suiet/wallet-kit";

const SupportedChains = [
  // ...DefaultChains,
  // SuiDevnetChain,
  SuiTestnetChain,
  // SuiMainnetChain,
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GlobalProvider>
      <WalletProvider 
        chains={SupportedChains}
        defaultWallets={[
          ...AllDefaultWallets,
          defineStashedWallet({
            appName: "Suiet Kit Playground",
          }),
        ]}
      >
        <BrowserRouter>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
      </WalletProvider>
    </GlobalProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
