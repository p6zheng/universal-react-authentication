import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { getIsAuthenticated, getUserName } from '../../reducers'

if (process.env.BROWSER) {
  require('./index.scss');
}

class Header extends Component {
  renderLinks() {
    if (this.props.isAuthenticated) {
      return (
        <Nav pullRight>
          <NavDropdown eventKey={3} title={this.props.userName} id="basic-nav-dropdown">
            <MenuItem componentClass={Link}  eventKey={3.1} href="/user/profile" to="/user/profile">
              <i className="fa fa-user-circle" />
              My Profile
            </MenuItem>
            <MenuItem componentClass={Link}  eventKey={3.2} href="/user/account" to="/user/account">
              <i className="fa fa-cog" />
              My Account
            </MenuItem>
            <MenuItem eventKey={3.3}>
              <i className="fa fa-heart" />
              My Favorites
            </MenuItem>
            <MenuItem divider />
            <MenuItem componentClass={Link}  eventKey={3.4} href="/signout" to="/signout">
              <i className="fa fa-sign-out" />
              Sign Out
            </MenuItem>
          </NavDropdown>
        </Nav>
      );
    }
    return (
      <Nav pullRight>
        <NavItem className="tab" componentClass={Link} eventKey={3} href="/signin" to="/signin">Sign In</NavItem>
        <NavItem className="tab" componentClass={Link} eventKey={4} href="/signup" to="/signup">Sign Up</NavItem>
      </Nav>
    );
  }

  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Brand</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem className="tab" componentClass={Link} eventKey={1} href="/" to="/">Home</NavItem>
            <NavItem className="tab" componentClass={Link} eventKey={2} href="/secret" to="/secret">Secret</NavItem>
          </Nav>
          {this.renderLinks()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  userName: getUserName(state)
});

export default connect(mapStateToProps)(Header);
