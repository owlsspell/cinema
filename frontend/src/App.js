import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Users from "./Users/User";
import Cinema from "./Cinema/Cinema";
import Navbar from "./Navbar/Navbar";
import Login from "./Login/Login";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Navbar/>
      
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Cinema />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
