
import * as React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import {LatestComponent, HomeComponent, TransactionsComponent} from '@components';
// import {PrivateRoute} from '@helpers';

import './app.styles.css';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="center-wrap">
        <Router>
          <div>
            <nav>
              <img className="logo" src={require('@assets/images/logo.png')} alt="" />
              <ul id="menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/latest">Latest</Link>
                </li>
              </ul>
              <div className="clear"></div>
            </nav>
            <Switch>
              <Route exact path="/" component={HomeComponent} />
              <Route exact path="/latest" component={LatestComponent} />
              <Route exact path="/transaction/:id" component={TransactionsComponent} />
              {/*  Private Routes not needed because we are not doing any authentication.
              <PrivateRoute exact path="/users" component={UsersComponent} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
