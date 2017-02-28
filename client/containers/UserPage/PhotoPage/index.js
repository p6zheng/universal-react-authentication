import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultAvatar from '../../../../assets/user.png';
import * as actions from '../../../actions/UserActions';
import { getImage } from '../../../reducers';

class Photo extends Component {

  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  componentDidMount() {
    this.props.fetchPhoto();
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
        <div>
          {imagePreview}
        </div>
        <form onSubmit={this.handleFileUpload.bind(this)}>
          <input type="file" onChange={this.handleImageChange.bind(this)} />
          <button
                  type="submit"
                  onClick={this.handleFileUpload.bind(this)}>Upload Image</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  image: getImage(state)
});

export default connect(mapStateToProps, actions)(Photo);