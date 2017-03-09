import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import FormInput from '../../../components/ProfileFormInput';
import FormLink from '../../../components/LinkFormInput';
import { getProfile } from '../../../reducers';
import * as actions from '../../../actions/UserActions';
import * as validator from '../../../utils/fieldValidator';

class Profile extends Component {

  componentDidMount() {
    this.props.fetchProfile();
  }

  componentWillUnmount() {
    this.props.unmountComponent();
  }

  handleFormSubmit(profile) {
    this.props.updateProfile(profile);
  }

  render() {
    const { handleSubmit } = this.props;
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
            name="age"
            component={FormInput}
            type="text"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Gender:</label>
          <div>
            <label><Field name="gender" component="input" type="radio" value="male"/> Male</label>
            <label><Field name="gender" component="input" type="radio" value="female"/> Female</label>
            <label><Field name="gender" component="input" type="radio" value="other"/> Other</label>
          </div>
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
    );
  }
}

const validate = ({ name, email, age }) => {
  const errors = {};
  if (name) { errors.name = validator.validateName(name); }
  if (email) { errors.email = validator.validateEmail(email); }
  if (age) { errors.age = validator.validateAge(age); }
  return errors;
};

const mapStateToProps = (state) => ({
  initialValues: getProfile(state)
});

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'profile',
  validate,
  enableReinitialize: true
})(Profile));