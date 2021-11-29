import React from 'react';
import styled from 'styled-components';

const WishListBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
  background: orange;
  .title {
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

const WishItemListBlock = styled.ul`

`;

const WishList = () => {
  return (
    <WishListBlock>
      <div className="title">
        <h2>Wish List</h2>
      </div>
      <WishItemListBlock>
        관심상품 목록
      </WishItemListBlock>
    </WishListBlock>
  );
};

export default WishList;