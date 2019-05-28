import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Home from './components/Home'


class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </div>
            </Router>
        )
    }
}


/**
 * @TODO
 * import { Link } from 'react-router-dom'
 * <Link to="/{path}"
 *  <li>blah-blah</li>
 * </Link>
 */

export default App
