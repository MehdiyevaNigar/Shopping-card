import "./App.css";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import { Navbar } from "./components/Navbar";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={Create} />
      </Switch>
    </div>
  );
}

export default App;
