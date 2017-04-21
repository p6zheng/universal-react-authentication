import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, } from 'react-bootstrap';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import Profile from './ProfilePage';
import Account from './AccountPage';
import Photo from './PhotoPage';
import './index.scss';


class User extends Component {

  render() {
    return (
     <div className="col-md-8 col-md-offset-2 top-buffer inside-padding">
       <Nav bsStyle="tabs" justified activeKey={this.props.activeTab} >
         <NavItem componentClass={Link} eventKey={'profile'} href="/user/profile" to="/user/profile">Profile</NavItem>
         <NavItem componentClass={Link} eventKey={'account'} href="/user/account" to="/user/account">Account</NavItem>
         <NavItem componentClass={Link} eventKey={'photo'} href="/user/photo" to="/user/photo">Photo</NavItem>
       </Nav>
       <div className="content">
         <Route path='/user/profile' component={Profile} />
         <Route path='/user/account' component={Account} />
         <Route path='/user/photo' component={Photo} />
       </div>
     </div>
    );
  }
}

const mapStateToProps = (state, router) => ({
  activeTab: router.match.params.userInfo
});

export default withRouter(connect(mapStateToProps)(User));