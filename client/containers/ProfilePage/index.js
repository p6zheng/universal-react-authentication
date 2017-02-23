import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import FormInput from '../../components/ProfileFormInput';
import profileImg from '../../../assets/user.png';
import { getProfile } from '../../reducers';
import * as actions from '../../actions/UserActions';

class Profile extends Component {
  componentDidMount() {
    this.props.fetchProfile();
  }

  handleFormSubmit(profile) {
    this.props.updateProfile(profile)
  }

  render() {
    const { handleSubmit } = this.props
    return (
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
          <label>Age:</label>
          <Field
            name="location"
            component={FormInput}
            type="text"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Gender:</label>
          <div>
            <label><Field name="gender" component="input" type="radio" value="male"/> Male</label>
            < label><Field name="gender" component="input" type="radio" value="female"/> Female</label>
            <label><Field name="gender" component="input" type="radio" value="other"/> Other</label>
          </div>
        </fieldset>
        <fieldset className="form-group">
          <label>Picture:</label>
          <div>
            <img src={profileImg} height="125" width="125"/>
          </div>
        </fieldset>
        <button action="submit" className="btn btn-primary">update</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  initialValues: getProfile(state)
});

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'profile',
  enableReinitialize: true
})(Profile));