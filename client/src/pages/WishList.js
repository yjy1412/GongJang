import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiHeartFill } from 'react-icons/ri';
import { FaTimes } from 'react-icons/fa';

const WishListBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
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
  display: flex;
  justify-content: flex-start;
  gap: 2.7rem;
  flex-wrap: wrap;
  padding: 2rem 0 4rem;
`;

const ItemBlock = styled.li`
  max-width: 250px;
  width: 100%;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5),
    2px 2px 5px rgba(94, 104, 121, 0.3);
  .item-img {
    position: relative;
    height: 150px;
    background: #ffdeb7;
    a {
      display: block;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1rem;
      cursor: pointer;
    }
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
`;

const WishList = () => {

  const onRemove = () => {}

  return (
    <WishListBlock>
      <div className="title">
        <h2>Wish List</h2>
      </div>
      <WishItemListBlock>
        <ItemBlock>
          <div className="item-img">
            {/* 
            <Link to="/postDetail/${id}">
              <img src="" alt="" />
            </Link>
            */}
            <Link to="/postDetail/1">
              <img src="" alt="" />
            </Link>
            <div className="close" onClick={() => onRemove()}>
              <FaTimes/>
            </div>
          </div>
          <div className="item-info">
            <p>title</p>
            <RiHeartFill fill="red"/>
          </div>
        </ItemBlock>
      </WishItemListBlock>
    </WishListBlock>
  );
};

export default WishList;