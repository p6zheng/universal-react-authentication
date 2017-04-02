import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import * as reducers from '../../reducers';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  renderLinks() {
    const { activeTab, isAuthenticated, userName, userPhoto } = this.props;
    const user = (
        <span>
          <img src={`http://localhost:3000/user/photo/${userPhoto}`}/>
            {userName}
        </span>
      );

    if (isAuthenticated) {
      return (
        <Nav pullRight>
          <NavDropdown className={activeTab === 'user' ? 'active' : ''} eventKey={3} title={user} id='basic-nav-dropdown'>
            <MenuItem componentClass={Link}  eventKey={3.1} href='/user/profile' to='/user/profile'>
              <i className='fa fa-user-circle' />
              My Profile
            </MenuItem>
            <MenuItem componentClass={Link}  eventKey={3.2} href='/user/account' to='/user/account'>
              <i className='fa fa-cog' />
              My Account
            </MenuItem>
            <MenuItem componentClass={Link}  eventKey={3.2} href='/user/photo' to='/user/photo'>
              <i className='fa fa-picture-o' />
              My Photo
            </MenuItem>
            <MenuItem eventKey={3.3}>
              <i className='fa fa-heart' />
              My Favorites
            </MenuItem>
            <MenuItem divider />
            <MenuItem componentClass={Link}  eventKey={3.4} href='/signout' to='/signout'>
              <i className='fa fa-sign-out' />
              Sign Out
            </MenuItem>
          </NavDropdown>
        </Nav>
      );
    }
    return (
      <Nav pullRight>
        <NavItem
          className={activeTab === 'signin' ? 'active' : ''}
          componentClass={Link}
          eventKey={3}
          href='/signin' to='/signin'>Sign In
        </NavItem>
        <NavItem
          className={activeTab === 'signup' ? 'active' : ''}
          componentClass={Link}
          eventKey={4}
          href='/signup' to='/signup'>Sign Up
        </NavItem>
      </Nav>
    );
  }

  render() {
    const { activeTab } = this.props;
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='/'>Brand</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem
              className={activeTab === '' ? 'active' : ''}
              componentClass={Link}
              eventKey={1}
              href='/' to='/'>Home
            </NavItem>
            <NavItem
              className={activeTab === 'secret' ? 'active' : ''}
              componentClass={Link}
              eventKey={2}
              href='/secret' to='/secret'>Secret
            </NavItem>
          </Nav>
          {this.renderLinks()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state, router) => ({
  isAuthenticated: reducers.getIsAuthenticated(state),
  userName: reducers.getUserName(state),
  userPhoto: reducers.getUserPhoto(state),
  activeTab: router.location.pathname.split('/')[1]
});

export default withRouter(connect(mapStateToProps)(Header));
