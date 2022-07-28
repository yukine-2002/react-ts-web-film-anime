import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import store from "./redux/store";
import { QueryParamProvider } from "use-query-params";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <BrowserRouter>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <App />
          </QueryParamProvider>
        </BrowserRouter>
      </React.StrictMode>
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
