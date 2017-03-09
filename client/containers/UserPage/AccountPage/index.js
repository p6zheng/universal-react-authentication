import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import FormInput from '../../../components/ProfileFormInput';
import AuthFormInput from '../../../components/AuthFormInput';
import * as actions from '../../../actions/UserActions';
import { getAccount, getFlashMessage } from '../../../reducers';
import * as validator from '../../../utils/fieldValidator';

class Account extends Component {

  componentDidMount() {
    this.props.fetchAccount();
  }

  componentWillUnmount() {
    this.props.unmountComponent();
  }

  handleFormSubmit(account) {
    this.props.updateAccount(account);
  }

  renderPassword() {
    if (this.props.account && this.props.account.containPassword) {
      return (
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            name="password"
            info="Enter Current Password"
            component={FormInput}
            type="text"/>
        </fieldset>
      );
    }
  }

  renderFlashMessage() {
    if (this.props.message) {
      return (
        <div className="alert alert-danger">
          <i className="fa fa-exclamation-circle" />
          {this.props.message}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {this.renderPassword()}
          <fieldset className="form-group">
            <Field
              name="newPassword"
              type="password"
              info="Enter New Password"
              component={AuthFormInput} />
          </fieldset>
          <fieldset className="form-group">
            <Field
              name="newPasswordConfirm"
              type="password"
              info="Re-type New Password"
              component={AuthFormInput} />
          </fieldset>
          <button action="submit" className="btn btn-primary">update</button>
        </form>
        <hr />
        <div>
          <label>Link Accounts:</label>
          <div className="form-group">
            <a className="btn btn-block btn-facebook btn-social" href="http://localhost:3000/auth/facebook">
              <i className="fa fa-facebook"/>
              Link Facebook
            </a>
            <a className="btn btn-block btn-twitter btn-social" href="http://localhost:3000/auth/twitter">
              <i className="fa fa-twitter"/>
              Link Twitter
            </a>
            <a className="btn btn-block btn-google btn-social" href="http://localhost:3000/auth/google">
              <i className="fa fa-google"/>
              Link Google
            </a>
            <a className="btn btn-block btn-github btn-social" href="http://localhost:3000/auth/github">
              <i className="fa fa-github"/>
              Link Github
            </a>
          </div>
        </div>
        {this.renderFlashMessage()}
      </div>
    );
  }
}

const validate = ({ password, newPassword, newPasswordConfirm}) => {
  const errors = {};

  if (password) {
    errors.password = validator.validatePassword(password);
  }

  if (newPassword) {
    errors.newPassword = validator.validatePassword(newPassword);
  }

  if (newPassword !== newPasswordConfirm) {
    errors.newPasswordConfirm = validator.validatePasswordConfirm(newPassword, newPasswordConfirm);
  }

  return errors;
};

const mapStateToProps = state => ({
  account: getAccount(state),
  message: getFlashMessage(state)
});

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'account',
  enableReinitialize: true,
  validate
})(Account));