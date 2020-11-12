import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Titlebar from "./components/titlebar"
import Home from "./Home"
import AppCSS from "./app.module.css"

export default function App() {
  return (
    <Router>
      <div className={AppCSS.app}>
        <Titlebar />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function About() {
  return <h2>About</h2>;
}
