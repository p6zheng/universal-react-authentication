import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import FormInput from '../../components/ProfileFormInput';
import FormLink from '../../components/LinkFormInput';
import * as actions from '../../actions/UserActions';

class Account extends Component {
  componentDidMount() {
    this.props.fetchAccount();
  }

  handleFormSubmit(profile) {
    this.props.updateProfile(profile)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            name="password"
            component={FormInput}
            type="text"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field
            name="passwordConfirm"
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
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'account'
})(Account));