import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Home from './components/Home'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
// import { fetchInitialAuth } from './actions/auth';

const loggerMiddleware = createLogger()
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
)

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/login" component={Login} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
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
