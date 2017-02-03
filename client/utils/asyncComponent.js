import React, { Component } from 'react';

const asyncComponent = (getComponent) => {
  return class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Component: this.Component
      }
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
  }
}

export default asyncComponent;