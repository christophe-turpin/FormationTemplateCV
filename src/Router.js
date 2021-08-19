import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import App from "./App";
import Login from "./components/Login/Login";

function Router() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage?.currentToken);
  }, []);
  return !token ? (
    <Route exact path="/">
      <Login />
    </Route>
  ) : (
    <Route exact path="/">
      <App />
    </Route>
  );
}

export default Router;
