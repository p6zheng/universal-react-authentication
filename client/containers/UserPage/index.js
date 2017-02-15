import React, { Component } from 'react';
import { Nav, NavItem, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from '../ProfilePage';
import Account from '../AccountPage';

class User extends Component {
   render() {
     return (
       <div className="col-md-8 col-md-offset-2 top-buffer inside-padding">
         <div className="panel panel-default">
           <Nav bsStyle="tabs" justified activeKey={1} >
             <NavItem componentClass={Link} eventKey={1} href="/user/profile" to="/user/profile">Profile Information</NavItem>
             <NavItem componentClass={Link} eventKey={2} href="/user/account" to="/user/account">Account Information</NavItem>
           </Nav>
           <Route path={`/user/profile`} component={Profile} />
           <Route path={`/user/account`} component={Account} />
         </div>
       </div>
     )
   }
}

export default User;