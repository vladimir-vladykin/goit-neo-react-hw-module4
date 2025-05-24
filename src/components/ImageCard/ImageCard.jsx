import styles from './ImageCard.module.css';

const ImageCard = ({ image, onImageClick }) => {
  return (
    <div className={styles.card} onClick={onImageClick}>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;
