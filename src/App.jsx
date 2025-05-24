import { useEffect, useState } from 'react';
import './App.css';
import { loadImages } from './api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);

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

  return (
    <>
      <SearchBar onSubmit={handleQuerySubmit} />
      <ImageGallery images={images} />
    </>
  );
}

export default App;
