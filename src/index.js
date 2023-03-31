import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CartContext from "./contexts/CartContext";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartContext>
        <ProSidebarProvider>
          <App />
        </ProSidebarProvider>
      </CartContext>
    </Provider>
   </React.StrictMode>
);
