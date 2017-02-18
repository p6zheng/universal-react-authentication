import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, } from 'react-bootstrap';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import Profile from '../ProfilePage';
import Account from '../AccountPage';

if (process.env.BROWSER) {
  require("./index.scss");
}

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   return (
     <div className="col-md-8 col-md-offset-2 top-buffer inside-padding">
       <Nav bsStyle="tabs" justified activeKey={this.props.activeTab} >
         <NavItem componentClass={Link} eventKey={'profile'} href="/user/profile" to="/user/profile">Profile Information</NavItem>
         <NavItem componentClass={Link} eventKey={'account'} href="/user/account" to="/user/account">Account Information</NavItem>
       </Nav>
       <div className="content">
         <Route path='/user/profile' component={Profile} />
         <Route path='/user/account' component={Account} />
       </div>
     </div>
   )
  }
}

const mapStateToProps = (state, router) => ({
  activeTab: router.match.params.userInfo
});

export default withRouter(connect(mapStateToProps)(User));