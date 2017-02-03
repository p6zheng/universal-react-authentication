import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/AuthActions';
import AuthFormInput from '../../components/AuthFormInput';
import { getError } from '../../reducers';

class Signin extends Component {
  handleFormSubmit(user) {
    this.props.signinUser(user);
  }

  alertError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div className="row top-buffer col-md-8 col-md-offset-2">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Email:</label>
            <Field
              name="email"
              component={AuthFormInput}
              type="text"/>
          </fieldset>
          <fieldset className="form-group">
            <label>Password:</label>
            <Field
              name="password"
              component={AuthFormInput}
              type="text"/>
          </fieldset>
          {this.alertError()}
          <button action="submit" className="btn btn-primary">Sign in</button>
        </form>
        <hr/>
        <div className="form-group">
          <a className="btn btn-block btn-facebook btn-social" href="/auth/facebook">
            <i className="fa fa-facebook"/>
              Sign in with Facebook
          </a>
          <a className="btn btn-block btn-twitter btn-social" href="/auth/twitter">
            <i className="fa fa-twitter"/>
            Sign in with Twitter
          </a>
          <a className="btn btn-block btn-google btn-social" href="/auth/google">
            <i className="fa fa-google"/>
            Sign in with Google
          </a>
          <a className="btn btn-block btn-github btn-social" href="/auth/github">
            <i className="fa fa-github"/>
            Sign in with Github
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: getError(state)
});

export default reduxForm({
  form: 'signin'
})(connect(mapStateToProps, actions)(Signin));
