import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { App } from './components';

ReactDOM.render((
    <Router history={createHistory()}>
        <Switch>
            <Route exact path="/" component={App} />
        </Switch>
    </Router>
    ),
    document.getElementById('root'));