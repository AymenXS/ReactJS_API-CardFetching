import axios from 'axios';
import Container from '../styles/Cards';
import Card from './Card';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Hourglass } from 'react-loader-spinner';

const Cards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);

  useEffect(() => {
    fetchData('https://swapi.dev/api/people/');
  }, []);

  useEffect(() => {
    console.log(cardsData);
  }, [cardsData]);

  const fetchData = async (url) => {
    try {
      setIsLoading(true);
      const response = await axios(url);
      setCardsData(response.data.results);
      setNextPageUrl(response.data.next);
      setPreviousPageUrl(response.data.previous);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchNextPage = () => {
    if (nextPageUrl) {
      fetchData(nextPageUrl);
    }
  };

  const fetchPreviousPage = () => {
    if (previousPageUrl) {
      fetchData(previousPageUrl);
    }
  };

  return (
    <Container>
      {isLoading && (
        <div className="loader">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
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
  );
};

export default Cards;
