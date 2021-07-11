import './App.css';
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./components/Issues/Issue/Create";
import Issue from './components/Issues/Issue/Issue';
import Layout from './components/Layout/Layout';

function App() {

    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/create">
                        <Create/>
                    </Route>
                    <Route exact path='/issues/:id'>
                        <Issue/>
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
