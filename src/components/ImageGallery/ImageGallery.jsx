import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(image => {
        return (
          <li key={image.id}>
            <ImageCard image={image} onImageClick={() => onImageClick(image)} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
