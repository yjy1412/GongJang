import React from 'react';
import styled from 'styled-components';
import gameImg from '../../style/images/game.jpg';

const GameImgBlock = styled.div`
  height: 450px;
  display: flex;
  justify-content: center;
  .img-box {
    min-width: 320px;
    width: 100%;
  }
`;

const GameImg = () => {
  return (
    <GameImgBlock>
        <div 
        className="img-box"
        style={{
          backgroundImage: `url(${gameImg})`,
          backgroundPosition: 'center center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
        >
        </div>
      </GameImgBlock>
  );
};

export default GameImg;