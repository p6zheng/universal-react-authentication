import React from 'react';
import './index.scss';

const LinkFormInput = ({ input, meta, link, label}) => {
  return (
  <div>
    <label className="linkName">{label}</label>
    <input className="linkInput" {...input} placeholder={link}/>
    {
      meta.touched &&
      meta.error &&
      <div className="error">
        <i className="fa fa-exclamation-circle" />
        {meta.error}
      </div>
    }
  </div>
)};

export default LinkFormInput;
