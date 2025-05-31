import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import { loadImages } from './api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import { ClipLoader, FadeLoader } from 'react-spinners';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

Modal.setAppElement('#root');

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imagesState, setImagesState] = useState({
    images: [],
    totalImagesCount: 0,
    selectedImage: null,
    currentPage: 0,
  });
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      try {
        setError(false);
        setLoading(true);
        const { images, totalImageCount } = await loadImages(searchQuery, 1);
        setImagesState(prevState => {
          return {
            ...prevState,
            images: images,
            totalImagesCount: totalImageCount,
            currentPage: 1,
          };
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }

      setLoading(false);
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
    try {
      setError(false);
      setLoading(true);
      const nextPage = imagesState.currentPage + 1;
      const { images, totalImageCount } = await loadImages(
        searchQuery,
        nextPage
      );

      setImagesState({
        ...imagesState,
        images: [...imagesState.images, ...images],
        totalImagesCount: totalImageCount,
        currentPage: nextPage,
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const handleLoadMoreClick = () => {
    loadMoreImages();
  };

  const isModalOpen = imagesState.selectedImage !== null;
  const loadMoreVisible =
    !isLoading &&
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
      {isError && <ErrorMessage />}
      <ClipLoader
        color="#ffffff"
        cssOverride={{
          display: 'block',
          margin: '0 auto',
        }}
        loading={isLoading}
        size={150}
        aria-label="Loading Spinner"
      />

      <ImageModal
        isOpen={isModalOpen}
        image={imagesState.selectedImage}
        onClose={handleModalClose}
      />
    </>
  );
}

export default App;
