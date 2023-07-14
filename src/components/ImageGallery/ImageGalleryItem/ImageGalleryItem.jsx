import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };
  render() {
    const { showModal } = this.state;
    const { largeImageURL, imgUrl, alt } = this.props;
    return (
      <>
        <li className={styles.gallery_item} onClick={this.toggleModal}>
          <img src={imgUrl} alt={alt} className={styles.gallery_images} />
        </li>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={largeImageURL}
              alt={alt}
              className={styles.modal_gallery_images}
            />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
