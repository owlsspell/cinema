import "../App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Users from "./Users/User";
import Cinema from "./Cinema/Cinema";
import Navbar from "./Navbar/NavbarHome";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
      
        <Switch>
          <Route path="/cinema">
            <Cinema />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          {/* <Route path="/login">
            <Login />
          </Route> */}
          <Route path="/">
            <Cinema />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
