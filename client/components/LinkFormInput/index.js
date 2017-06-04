import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const LinkFormInput = ({ input, meta, link, label}) => (
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
);

LinkFormInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  link: PropTypes.string,
  label: PropTypes.string
};

export default LinkFormInput;
