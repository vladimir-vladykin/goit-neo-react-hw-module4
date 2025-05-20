import React from 'react';
import styles from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();

    const query = event.target.elements.search.value;
    if (query === '') {
      console.log('empty');
      toast('Search query is empty', { position: 'top-right' });
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
