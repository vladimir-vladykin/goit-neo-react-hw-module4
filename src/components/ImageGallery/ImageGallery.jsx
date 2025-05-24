import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(image => {
        return (
          <li>
            <ImageCard image={image} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
