import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/index.jsx";
import "./app/styles/global.css";

import "./shared/styles/common.css";
import "./shared/styles/components.css";
import "./shared/styles/style.css";

//  import "./shared/styles/main_teacher.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);