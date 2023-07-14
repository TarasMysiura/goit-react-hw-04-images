import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Modal/Modal.module.css';

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // componentWillUnmount
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]); // componentDidMount

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) onClose();
  };
  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
