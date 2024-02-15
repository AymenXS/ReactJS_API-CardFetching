import styled from 'styled-components';

const Container = styled.div`
  min-width: 200px;
  min-height: 300px;
  text-align: center;
  text-transform: capitalize;
  overflow: hidden;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;

  .image-container {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    .card-image {
      height: 100%;
      object-fit: cover;
      width: 100%;
      margin-bottom: 0.5em;
    }
  }

  .name {
    font-size: 1.2em;
    font-weight: bold;
  }
`;

export default Container;
