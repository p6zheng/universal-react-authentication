import React from 'react';

if (process.env.BROWSER) {
  require('./index.scss');
}

const AuthFormInput = ({ input, meta }) => (
  <div>
    <input className="form-control" {...input} />
    {
      meta.touched &&
      meta.error &&
      <div className="error">
        <i className="fa fa-exclamation-circle" />
        {meta.error}
      </div>
    }
  </div>
)

export default AuthFormInput;
