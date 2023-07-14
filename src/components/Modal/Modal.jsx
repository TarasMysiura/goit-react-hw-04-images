import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Modal/Modal.module.css';

// const modalRoot = document.querySelector('#modal-root');

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }
  hendleKeyDown = event => {
    if (event.code === 'Escape') this.props.onClose();
  };
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) this.props.onClose();
  };
  render() {
    return (
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
