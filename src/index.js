import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./Screens/Home";
import Learn from "./Screens/Learn";
import Practice from "./Screens/Practice";
import Vocabulary from "./Screens/Vocabulary";
import BottomNavigationBar from "./Components/BottomNavigationBar";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const App = () => {
  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "",
        justifyContent: "space-between"
      }}
    >
      <Router>
        <Route path="/learn">
          <Learn />
        </Route>
        <Route path="/practice">
          <Practice />
        </Route>
        <Route path="/vocabulary">
          <Vocabulary />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <BottomNavigationBar />
        </Route>
      </Router>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.register();
