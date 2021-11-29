import React from 'react';
import styled from 'styled-components';
import ItemList from '../components/main/ItemList';
import GameImg from '../components/main/GameImg';

const MainBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
  .share-text {
    position: relative;
    text-align: center;
    padding: 2rem 0;
    &:after,
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      height: 2px;
      width: 50px;
      background: #575f95;
    }
    &:after {
      left: 35%;
    }
    &:before {
      right: 35%;
    }
  }
`;

const Main = () => {
  return (
    <MainBlock>
      <GameImg/>
      <div className="share-text">
        <h2>공.장 나눔 공간</h2>
      </div>
      <ItemList/>
    </MainBlock>
  );
};

export default Main;