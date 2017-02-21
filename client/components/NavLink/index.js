import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class React extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }
  handleClick() {
    this.setState({
      ative: active
    });
  }
  render() {
    return (
      <Link onClick={this.handleClick.bind(this)}/>
    )
  }
}