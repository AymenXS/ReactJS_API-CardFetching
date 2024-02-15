import Container from '../styles/Card';
import { useEffect, useState } from 'react';
import { colorNameList } from 'color-name-list';
import { DNA } from 'react-loader-spinner';

const Card = ({ name, hair_color, skin_color, gender, vehicle }) => {
  const getColor = (name) => {
    const color = colorNameList.find(
      (color) => color.name === name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    );

    if (color) {
      return color.hex;
    } else {
      return '#ffffff';
    }
  };

  const isColorDark = (color) => {
    // Convert hex color to RGB
    const hexColor = color.replace('#', '');
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    // Calculate luminance
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    // Check if luminance is less than a threshold
    if (luminance < 0.5) {
      return true;
    } else {
      return false;
    }
  };

  const fixedHairColor = hair_color.split(',');
  const backgroundColor = getColor(fixedHairColor[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState();
  const [apiAvailable, setApiAvailable] = useState(true);
  const url = 'https://picsum.photos/200/300s';

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const blob = await response.blob();
      const imageSrc = URL.createObjectURL(blob);
      setImageData(imageSrc);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiAvailable(false); // Set API availability state to false
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name]);

  return (
    <Container
      style={{
        backgroundColor: backgroundColor,
        border: `1px solid ${backgroundColor === '#ffffff' ? 'grey' : backgroundColor}`,
        color: isColorDark(backgroundColor) ? 'white' : '',
      }}
    >
      {apiAvailable ? (
        <>
          <div className="image-container">
            {isLoading ? (
              <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            ) : (
              <img className="card-image" src={imageData} alt="Card-Image" />
            )}
          </div>

          <h4 className="name">{name}</h4>
          <div className="description">
            <p className="hair-color">{hair_color}</p>
            <p className="skin-color">{skin_color}</p>
            <p className="gender">{gender === 'n/a' ? 'Not Available' : gender}</p>
            <p className="vehicles-count">{vehicle}</p>
          </div>
        </>
      ) : (
        <>
          <div className="image-container">API is not available</div>
          <h4 className="name">{name}</h4>
          <div className="description">
            <p className="hair-color">{hair_color}</p>
            <p className="skin-color">{skin_color}</p>
            <p className="gender">{gender === 'n/a' ? 'Not Available' : gender}</p>
            <p className="vehicles-count">{vehicle}</p>
          </div>
        </>
      )}
    </Container>
  );
};

export default Card;