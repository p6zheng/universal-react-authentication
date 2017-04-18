import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './containers/Header';
import Home from './containers/HomePage';
import { getIsAuthenticated } from './reducers';

if (process.env.BROWSER) {
  require("./main.scss");
}

const { Signin, Signup, Signout, Secret, Error, User } = require('./asychRoutes');

class Root extends Component {
  render() {
    const isAuthenticated = this.props.isAuthenticated;
    return (
      <div className="Root">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" render={() =>
            isAuthenticated ? <Secret /> : <Redirect to="/" />
          } />
          <Route path="/signup" render={() =>
            isAuthenticated ? <Redirect to="/" /> : <Signup />
          } />
          <Route path="/signout" component={Signout} />
          <Route path="/signin" render={() =>
            isAuthenticated ? <Redirect to="/" /> : <Signin />
          } />
          <Route path="/user/:userInfo" render={props =>
            isAuthenticated ? <User {...props} /> : <Redirect to="/"/>
          }/>

          <Route component={Error}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state)
});

export default withRouter(connect(mapStateToProps)(Root));

