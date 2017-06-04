import React from 'react';
import PropTypes from 'prop-types';

const AuthFormInput = ({ input, meta, type, info, name, label }) => (
  <div>
    <input className="form-control" {...input} type={type} placeholder={info} />
    {
      meta.touched &&
      meta.error &&
      <div className="error">
        <i className="fa fa-exclamation-circle" />
        {meta.error}
      </div>
    }
  </div>
);

AuthFormInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  type: PropTypes.string,
  info: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string
};

export default AuthFormInput;