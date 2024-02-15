import styled from 'styled-components';

const Container = styled.div`
  min-width: 220px;
  max-width: 220px;
  min-height: 300px;
  text-transform: capitalize;
  overflow: hidden;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;

  .image-container {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.8em;
    .card-image {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  .name {
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
    white-space: normal;
  }

  .descriptions {
    padding: 0.8em;
  }
`;

export default Container;
