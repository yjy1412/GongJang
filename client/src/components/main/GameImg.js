import React from 'react';
import styled from 'styled-components';
import gameImg from '../../style/images/game.jpg';

const GameImgBlock = styled.div`
  height: 40vh;
  display: flex;
  justify-content: center;
  .img-box {
    width: 70%;
  }
`;

const GameImg = () => {
  return (
    <GameImgBlock>
        <div 
        className="img-box"
        style={{
          backgroundImage: `url(${gameImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
        >
        </div>
      </GameImgBlock>
  );
};

export default GameImg;