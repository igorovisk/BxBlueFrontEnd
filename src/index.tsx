import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/index.css";
import App from "./App";
import { AuthContext, AuthProvider } from "./contexts/authContext";
const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
);
root.render(
   <React.StrictMode>
      <AuthProvider>
         <App />
      </AuthProvider>
   </React.StrictMode>
);
