import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultAvatar from '../../../../assets/user.png';
import * as actions from '../../../actions/UserActions';
import { getImage, getSuccessMessage } from '../../../reducers';

class Photo extends Component {

  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  componentDidMount() {
    this.props.fetchPhoto();
  }

  componentWillUnmount() {
    this.props.unmountComponent();
  }

  handleFileUpload(e) {
    e.preventDefault();
    this.props.uploadPhoto(this.state.file);
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  alertMessage() {
    if (this.props.message) {
      return (
        <div className="alert alert-success">
          <strong>{this.props.message}</strong>
        </div>
      );
    }
  }

  render() {
    let imagePreview = null;
    let { imagePreviewUrl } = this.state;
    const { image } = this.props;

    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} height="200" width="200"/>);
    } else if (image) {
      imagePreview = (<img src={`http://localhost:3000/user/photo/${image}`} height="200" width="200"/>);
    } else {
      imagePreview = (<img src={defaultAvatar} height="200" width="200"/>);
    }

    return (
      <div>
        <label>Preview:</label>
        <div className="thumbnail">
          {imagePreview}
        </div>
        <form onSubmit={this.handleFileUpload.bind(this)}>
          <div className="input-group">
            <label className="input-group-btn">
                      <span className="btn btn-primary">
                          Browse&hellip; <input type="file" style={{display: 'none'}} onChange={this.handleImageChange.bind(this)}  />
                      </span>
            </label>
            <input type="text" className="form-control" readOnly value={this.state.file.name || ''} />
          </div>
          <div className="top-buffer">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleFileUpload.bind(this)}>Upload Image</button>
          </div>
        </form>
        {this.alertMessage()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  image: getImage(state),
  message: getSuccessMessage(state)
});

export default connect(mapStateToProps, actions)(Photo);