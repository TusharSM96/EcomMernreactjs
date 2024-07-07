import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProviderWraper } from "./Auth/Auth";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProviderWraper>
    <BrowserRouter>
      <ToastContainer
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <App />
    </BrowserRouter>
  </AuthProviderWraper>
);
