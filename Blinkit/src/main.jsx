import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Store from "./Store/Store.jsx";
import { ReduxStore } from "../src/Store/Store.jsx";
import { Provider } from "react-redux";
import Routing from "./Routing.jsx";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./ErrorBoundary.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <ErrorBoundary>
      <Provider store={ReduxStore}>
        <Store>
          <Routing />
        </Store>
      </Provider>
      <Toaster position="top-center" reverseOrder={false} />
    </ErrorBoundary>
  </BrowserRouter>
  // </StrictMode>
);
