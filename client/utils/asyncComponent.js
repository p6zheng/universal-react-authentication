import React, { Component } from 'react';

// Higher order component for code splitting with react router v4.
// Code taken from https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
const asyncComponent = (getComponent) => {
  return class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Component: this.Component
      };
    }

    componentWillMount() {
      if (!this.state.Component && typeof Window !== 'undefined') {
        getComponent().then(Component => {
          this.setState({
            Component
          });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.state}/>;
      }
      return null;
    }
  };
};

export default asyncComponent;