import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import FormInput from '../../components/ProfileFormInput';
import profileImg from '../../../assets/user.png';
import { getUser } from '../../reducers';
import * as actions from '../../actions/UserActions';

class Account extends Component {
  componentDidMount() {
    this.props.fetchProfile();
  }

  handleFormSubmit(profile) {
    this.props.updateProfile(profile)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div className="top-buffer col-md-8 col-md-offset-2">
        <div className="page-header">
          <h3>
            Profile Information
          </h3>
        </div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <fieldset className="form-group">
            <label>Name:</label>
            <Field
              name="name"
              component={FormInput}
              type="text"/>
          </fieldset>
          <fieldset className="form-group">
            <label>Email:</label>
            <Field
              name="email"
              component={FormInput}
              type="text" />
          </fieldset>
          <fieldset className="form-group">
            <label>Location:</label>
            <Field
              name="location"
              component={FormInput}
              type="text"/>
          </fieldset>
          <fieldset className="form-group">
            <label>Gender:</label>
            <div>
              <div className="col-md-4">
                <input type="radio" name="gender" value="male" />
                <strong> Male</strong>
              </div>
              <div className="col-md-4">
                <input type="radio" name="gender" value="female" />
                <strong> Female</strong>
              </div>
              <div className="col-md-4">
                <input type="radio" name="gender" value="other" />
                <strong> Other</strong>
              </div>
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label>Picture:</label>
            <div>
              <img src={profileImg} height="125" width="125"/>
            </div>
          </fieldset>
          <button action="submit" className="btn btn-primary">save</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'account'
})(Account));