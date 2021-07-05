import './App.css';
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Create from "./components/Issues/Case/Create";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                    <Navbar/>
                </Route>
                <Route exact path="/create">
                    <Create/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
