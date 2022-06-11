import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { routers } from "./router";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducers from "./reducers/rootReducers";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import DefaultLayout from "./components/layout/Default";
import reduxPromise from "redux-promise-middleware";

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(reduxPromise, thunk, logger))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          {routers.map(({ path, page }, index) => {
            return <Route key={index} path={path} element={page} />;
          })}
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  </Provider>
);
