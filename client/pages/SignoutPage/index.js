import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/AuthActions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div className="row jumbotron top-buffer">
        <h2>You have successfully logged out!!</h2>
      </div>
    );
  }
}

Signout.propTypes = {
  signoutUser: PropTypes.func
};

export default connect(null, actions)(Signout);
