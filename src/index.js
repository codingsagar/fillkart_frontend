import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        pauseOnFocusLoss
        position="top-center"
        autoClose={3000}
        toastStyle={{maxWidth:"90vw",minWidth:"300px",borderRadius:"5px",marginTop:"10px",fontSize:"14px"}}
        style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}
      />
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </Provider>
  </React.StrictMode>
);
