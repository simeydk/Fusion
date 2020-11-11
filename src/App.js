import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Titlebar from "./components/titlebar"
import Home from "./Home"

export default function App() {
  return (
    <Router>
      <>
        <Titlebar />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </>
    </Router>
  );
}


function About() {
  return <h2>About</h2>;
}
