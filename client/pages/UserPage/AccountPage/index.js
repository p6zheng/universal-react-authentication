import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import AuthFormInput from '../../../components/AuthFormInput';
import * as actions from '../../../actions/UserActions';
import * as reducers from '../../../reducers';
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

  alertMessage() {
    if (this.props.message) {
      return (
        <div className="alert alert-success">
          <strong>{this.props.message}</strong>
        </div>
      );
    }
  }

  renderPassword() {
    if (this.props.account && this.props.account.containPassword) {
      return (
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            name="password"
            info="Enter Current Password"
            component={AuthFormInput}
            type="text"/>
        </fieldset>
      );
    }
  }

  renderFlashMessage() {
    const { flashMessage } = this.props;
    if (flashMessage && flashMessage.type === 'ERROR') {
      return (
        <div className="alert alert-danger">
          <i className="fa fa-exclamation-circle" />
          {flashMessage.message}
        </div>
      );
    } else if (flashMessage && flashMessage.type === 'SUCCESS') {
      return (
        <div className="alert alert-success">
          <i className="fa fa-check-circle" />
          {flashMessage.message}
        </div>
      );
    }
  }

  displayLinkButton(account) {
    const accountLower = account.toLowerCase();
    if (this.props.account) {
      return this.props.account.linkedAccounts[accountLower] ?
        <a className={`btn btn-block btn-${accountLower} btn-social`} onClick={() => this.props.unlinkProvider(accountLower)}>
          <i className={`fa fa-${accountLower}`}/>
          Unlink {account}
        </a>:
        <a className={`btn btn-block btn-${accountLower} btn-social`} href={`http://localhost:3000/auth/${accountLower}`}>
          <i className={`fa fa-${accountLower}`}/>
          Link {account}
        </a>;
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
        {this.alertMessage()}
        <hr />
        <div>
          <label>Link Accounts:</label>
          <div className="form-group">
            {this.displayLinkButton('Facebook')}
            {this.displayLinkButton('Google')}
            {this.displayLinkButton('Twitter')}
            {this.displayLinkButton('Github')}
          </div>
        </div>
        {this.renderFlashMessage()}
      </div>
    );
  }
}

const validate = ({ password, newPassword, newPasswordConfirm}) => {
  const errors = {};
  if (password) errors.password = validator.validatePassword(password);
  if (newPassword) errors.newPassword = validator.validatePassword(newPassword);
  if (newPassword !== newPasswordConfirm)
    errors.newPasswordConfirm = validator.validatePasswordConfirm(newPassword, newPasswordConfirm);
  return errors;
};

const mapStateToProps = state => ({
  account: reducers.getAccount(state),
  flashMessage: reducers.getFlashMessage(state),
  message: reducers.getUserUpdateSuccess(state)
});

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'account',
  enableReinitialize: true,
  validate
})(Account));