import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

import './index.css';

import login from './wishList/login';
import wish from './wishList/wish';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={wish} />
        <Route path='/wish' component={login} />
        <Redirect to ='/' />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));