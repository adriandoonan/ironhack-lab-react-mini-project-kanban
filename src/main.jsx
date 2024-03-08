import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
const baseUrl = "/ironhack-lab-react-mini-project-kanban";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<BrowserRouter basename={baseUrl}>
		<App />
	</BrowserRouter>,
	// </React.StrictMode>,
);
