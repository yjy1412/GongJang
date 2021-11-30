import React from 'react';
import styled from 'styled-components';
import EmptyText from '../../style/images/emptyText.gif';

const WishListEmptyBlock = styled.div`
  height: 80vh;
  position: relative;
  .empty-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    img {
      width: 100%;
    }
  }
`;


const WishListEmpty = () => {
  return (
    <WishListEmptyBlock>
      <div className="empty-text">
        <img src={EmptyText} alt="빈 페이지 텍스트" />
      </div>
    </WishListEmptyBlock>
  );
};

export default WishListEmpty;