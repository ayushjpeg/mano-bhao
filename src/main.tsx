import "./index.css"

import App from "./App"
import { BrowserRouter } from "react-router-dom"
// src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
