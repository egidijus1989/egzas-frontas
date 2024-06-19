import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ToastContainer position="top-center" />
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
