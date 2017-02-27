import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultAvatar from '../../../../assets/user.png';
import * as actions from '../../../actions/UserActions';
import { getImage } from '../../../reducers';

class Photo extends Component {

  componentDidMount() {
    this.props.fetchPhoto();
  }

  handleFileUpload(e) {
    e.preventDefault();
    const image = e.target.files[0];
    this.props.uploadPhoto(image);
  }

  render() {
    const { image } = this.props;
    const photoPath =  image ? require(`../../../../uploads/${image}`): null;
    return (
      <div>
        <label>Preview:</label>
        <div>
          <img src={photoPath || defaultAvatar} height="200" width="200"/>
        </div>
        <input type="file" onChange={this.handleFileUpload.bind(this)} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  image: getImage(state)
});

export default connect(mapStateToProps, actions)(Photo);