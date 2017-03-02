import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import FormInput from '../../../components/ProfileFormInput';
import FormLink from '../../../components/LinkFormInput';
import * as actions from '../../../actions/UserActions';
import { getAccount } from '../../../reducers';

class Account extends Component {
  componentDidMount() {
    this.props.fetchAccount();
  }

  handleFormSubmit(account) {
    this.props.updateAccount(account);
  }

  renderPassword() {
    if(this.props.account && this.props.account.containPassword) {
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

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {this.renderPassword()}
          <fieldset className="form-group">
            <Field
              name="newPassword"
              info="Enter New Password"
              component={FormInput}
              type="text"/>
          </fieldset>
          <fieldset className="form-group">
            <Field
              name="confirmNewPassword"
              info="Re-type New Password"
              component={FormInput}
              type="text" />
          </fieldset>
          <hr />
          <label>Links:</label>
          <fieldset className="form-group">
            <Field
              name="google"
              label="Google:"
              link="https://plus.google.com/"
              component={FormLink}
              type="text"/>
          </fieldset>
          <fieldset className="form-group">
            <Field
              name="facebook"
              label="Facebook:"
              link="http://www.facebook.com/"
              component={FormLink}
              type="text" />
          </fieldset>
          <fieldset className="form-group">
            <Field
              name="github"
              label="Github:"
              link="http://www.github.com/"
              component={FormLink}
              type="text" />
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
      </div>
    )
  }
}

const validate = (formProps) => {
  const errors = {};

  if (!formProps.password) {
    errors.password = 'Please enter current password';
  }

  if (!formProps.newPassword) {
    errors.newPassword = 'Please enter the new password';
  }

  if (!formProps.confirmNewPassword) {
    errors.confirmNewPassword = 'Please re-type the new password';
  }

  if (formProps.newPassword !== formProps.confirmNewPassword) {
    errors.newPassword = 'New passwords must match';
  }

  return errors;
}

const mapStateToProps = state => ({
  account: getAccount(state)
});

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'account',
  enableReinitialize: true,
  validate
})(Account));