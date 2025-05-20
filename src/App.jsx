import { useEffect, useState } from 'react';
import './App.css';
import { loadImages } from './api';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchImages() {
      const { images, totalImageCount } = await loadImages(searchQuery, 1);
      console.log(`images ${images.length}, total count is ${totalImageCount}`);
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
    </>
  );
}

export default App;
