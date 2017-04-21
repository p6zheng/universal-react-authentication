import './main.scss';
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import { getIsAuthenticated } from './reducers';


const { Signin, Signup, Signout, Secret, Error, User } =
  typeof window === 'undefined' ? require('./serverRoutes') : require('./asychRoutes');

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
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state)
});

export default withRouter(connect(mapStateToProps)(Root));

