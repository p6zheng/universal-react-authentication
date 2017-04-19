import React from 'react';

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

export default AuthFormInput;
