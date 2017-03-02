import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/AuthActions';
import AuthFormInput from '../../components/AuthFormInput';
import * as reducers from '../../reducers';

class Signup extends Component {
  handleFormSubmit(form) {
    this.props.signupUser(form);
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
            <fieldset className="form-group">
              <label>Username:</label>
              <Field
                name="username"
                component={AuthFormInput}
                type="text"/>
            </fieldset>
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
          <fieldset className="form-group">
            <label>Confirm Password:</label>
            <Field
              name="passwordConfirm"
              component={AuthFormInput}
              type="text"/>
          </fieldset>
          {this.alertError()}
          <button action="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
    );
  }
}

const validate = (formProps) => {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}


const mapStateToProps = state => ({
  errorMessage: reducers.getSignupError(state),
  isAuthenticating: reducers.getIsAuthenticating(state)
});

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signup',
  validate
})(Signup));
