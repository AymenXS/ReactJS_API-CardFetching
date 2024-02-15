import axios from 'axios';
import Container from '../styles/Cards';
import Card from './Card';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Hourglass } from 'react-loader-spinner';

const Cards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData('https://swapi.dev/api/people/');
  }, []);

  const fetchData = async (url) => {
    try {
      setIsLoading(true);
      const response = await axios(url);
      setCardsData(response.data.results);
      if (response.data.next === null) {
        setLastPage(currentPage);
      }
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
      setError('Server is down. Please try again later.');
    }
  };

  const fetchPage = (page) => {
    setCurrentPage(page);
    fetchData(`https://swapi.dev/api/people/?search=${searchQuery}&page=${page}`);
  };

  const fetchNextPage = () => {
    if (lastPage) {
      return;
    }
    fetchPage(currentPage + 1);
  };

  const fetchPreviousPage = () => {
    if (currentPage === 1) {
      return;
    }
    setLastPage(null);
    fetchPage(currentPage - 1);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchData(`https://swapi.dev/api/people/?search=${searchQuery}`);
  };

  return (
    <>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search characters..."
              className="input-text"
            />
            <button type="submit" className="submit">
              Search
            </button>
          </form>

          <Container>
            {isLoading && (
              <div className="loader">
                <Hourglass
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="hourglass-loading"
                  wrapperClass=""
                  colors={['#306cce', '#72a1ed']}
                />
              </div>
            )}

            <IoArrowBackOutline className="left-arrow" onClick={fetchPreviousPage} />
            {cardsData.map((cardData, index) => (
              <Card key={index} {...cardData} />
            ))}
            <IoArrowForwardOutline className="right-arrow" onClick={fetchNextPage} />
          </Container>
        </>
      )}
    </>
  );
};

export default Cards;
