import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/AuthActions';
import * as reducers from '../../reducers';

class Secret extends Component {
  componentDidMount() {
    this.props.fetchMessage();
  }

  renderMessage() {
    return this.props.message || 'Loading';
  }

  render() {
    return (
      <div className="row jumbotron top-buffer">
        <h2>This is some SECRET text!!</h2>
        <h4>{this.renderMessage()}</h4>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: reducers.getMessage(state)
});

export default connect(mapStateToProps, actions)(Secret);
