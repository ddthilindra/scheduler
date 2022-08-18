import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Schedule";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/Dashboard" exact component={Dashboard} />
          <Route path="/" exact component={Dashboard} />
          <Route path="/home" exact component={Dashboard} />
        </Switch>
      </Router>
    </>
  );
}
