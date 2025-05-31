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
  const [imagesState, setImagesState] = useState({
    images: [],
    totalImagesCount: 0,
    selectedImage: null,
    currentPage: 0,
  });

  useEffect(() => {
    async function fetchImages() {
      const { images, totalImageCount } = await loadImages(searchQuery, 1);
      setImagesState(prevState => {
        return {
          ...prevState,
          images: images,
          totalImagesCount: totalImageCount,
          currentPage: 1,
        };
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

  async function loadMoreImages() {
    const nextPage = imagesState.currentPage + 1;
    const { images, totalImageCount } = await loadImages(searchQuery, nextPage);

    setImagesState({
      ...imagesState,
      images: [...imagesState.images, ...images],
      totalImagesCount: totalImageCount,
      currentPage: nextPage,
    });
  }

  const handleLoadMoreClick = () => {
    loadMoreImages();
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
