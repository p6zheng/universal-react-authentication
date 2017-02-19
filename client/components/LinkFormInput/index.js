import React from 'react';

const LinkFormInput = ({ input, meta, link, }) => {
  return (
  <div >
    <input className="form-control" {...input} placeholder={link}/>
    {
      meta.touched &&
      meta.error &&
      <div className="error">
        <i className="fa fa-exclamation-circle" />
        {meta.error}
      </div>
    }
  </div>
)}

export default LinkFormInput;
