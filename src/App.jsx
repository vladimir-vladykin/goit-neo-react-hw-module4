import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import { loadImages } from './api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';

Modal.setAppElement('#root');

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      const { images, totalImageCount } = await loadImages(searchQuery, 1);
      console.log(`images ${images.length}, total count is ${totalImageCount}`);

      // todo actually should recreate array with new values
      setImages(images);
    }

    if (searchQuery !== '') {
      fetchImages();
    }
  }, [searchQuery]);

  const handleQuerySubmit = query => {
    setSearchQuery(query);
  };

  const handleImageClick = image => {
    console.log('image click');
    setSelectedImage(image);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  const isModalOpen = selectedImage !== null;
  return (
    <>
      <SearchBar onSubmit={handleQuerySubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />

      <ImageModal
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={handleModalClose}
      />
    </>
  );
}

export default App;
