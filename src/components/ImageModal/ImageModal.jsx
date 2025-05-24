import Modal from 'react-modal';
import styles from './ImageModal.module.css';

const ImageModal = ({ isOpen, image, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      preventScroll={true}
      onAfterOpen={() => (document.body.style.overflow = 'hidden')}
      onAfterClose={() => (document.body.style.overflow = 'unset')}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
        },
        content: {
          backgroundColor: 'transparent',
          padding: '0',
          border: 'none',
          borderRadius: '0',
          overflow: 'hidden',
          pointerEvents: 'none',
        },
      }}
    >
      {image !== null && (
        <img
          className={styles.image}
          src={image.urls.regular}
          alt={image.alt_description}
        />
      )}
    </Modal>
  );
};

export default ImageModal;
