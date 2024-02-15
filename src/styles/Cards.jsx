import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
  font-size: 1.6rem;

  .loader {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    backdrop-filter: blur(9px);
  }

  .left-arrow,
  .right-arrow {
    position: absolute;
    font-size: 3.5em;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      color: #c0c0c0;
    }

    &:active {
      color: red;
    }
  }

  .left-arrow {
    left: 2%;
  }
  .right-arrow {
    right: 2%;
  }
`;

export default Container;