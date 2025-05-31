import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import { loadImages } from './api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

Modal.setAppElement('#root');

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  // const [images, setImages] = useState([]);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [imagesState, setImagesState] = useState({
    images: [],
    totalImagesCount: 0,
    selectedImage: null,
  });

  useEffect(() => {
    async function fetchImages() {
      const { images, totalImageCount } = await loadImages(searchQuery, 1);
      setImagesState({
        ...imagesState,
        images: images, // todo actually should recreate array with new values?
        totalImagesCount: totalImageCount,
      });
    }

    if (searchQuery !== '') {
      fetchImages();
    }
  }, [searchQuery]);

  const handleQuerySubmit = query => {
    setSearchQuery(query);
  };

  const handleImageClick = image => {
    setImagesState({
      ...imagesState,
      selectedImage: image,
    });
  };

  const handleModalClose = () => {
    setImagesState({
      ...imagesState,
      selectedImage: null,
    });
  };

  const handleLoadMoreClick = () => {
    console.log('load more click');
  };

  const isModalOpen = imagesState.selectedImage !== null;
  const loadMoreVisible =
    imagesState.images.length > 0 &&
    imagesState.images.length < imagesState.totalImagesCount;
  return (
    <>
      <SearchBar onSubmit={handleQuerySubmit} />
      <ImageGallery
        images={imagesState.images}
        onImageClick={handleImageClick}
      />

      {loadMoreVisible && <LoadMoreBtn onClick={handleLoadMoreClick} />}

      <ImageModal
        isOpen={isModalOpen}
        image={imagesState.selectedImage}
        onClose={handleModalClose}
      />
    </>
  );
}

export default App;
