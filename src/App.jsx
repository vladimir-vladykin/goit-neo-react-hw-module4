import './App.css';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const handleQuerySubmit = query => {
    console.log(query);
  };

  return (
    <>
      <SearchBar onSubmit={handleQuerySubmit} />
    </>
  );
}

export default App;
