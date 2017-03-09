import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/AuthActions';
import AuthFormInput from '../../components/AuthFormInput';
import * as reducers from '../../reducers';
import * as validator from '../../utils/fieldValidator';

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
              type="password"
              component={AuthFormInput} />
          </fieldset>
          <fieldset className="form-group">
            <label>Confirm Password:</label>
            <Field
              name="passwordConfirm"
              type="password"
              component={AuthFormInput} />
          </fieldset>
          {this.alertError()}
          <button action="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
    );
  }
}

const validate = ({ username, email, password, passwordConfirm }) => {
  const errors = {};
  if (username) { errors.username = validator.validateUserName(username); }
  if (password) { errors.email = validator.validateEmail(email); }
  if (passwordConfirm) { errors.password = validator.validatePassword(password); }
  if (passwordConfirm) { errors.passwordConfirm = validator.validatePasswordConfirm(password, passwordConfirm); }
  return errors;
};


const mapStateToProps = state => ({
  errorMessage: reducers.getSignupError(state),
  isAuthenticating: reducers.getIsAuthenticating(state)
});

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signup',
  validate
})(Signup));
