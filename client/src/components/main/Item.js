import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';

const ItemBlock = styled.li`
  max-width: 250px;
  width: 100%;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5),
    2px 2px 5px rgba(94, 104, 121, 0.3);
  .item-img {
    height: 150px;
    background: #ffdeb7;
    a {
      display: block;
      width: 100%;
      height: 100%;
      padding: 0.5rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
`;

const Item = () => {
  return (
    <ItemBlock>
      <div className="item-img">
        {/* 
        <Link to="/${id}">
          <img src="" alt="" />
        </Link>
        */}
        <Link to="/1">
          <img src="" alt="" />
        </Link>
      </div>
      <div className="item-info">
        <p>title</p>
        <div 
        className="check-wish"
        // onClick={onClickWish}
        >
          <RiHeartLine fill="red"/>
        </div>
      </div>
    </ItemBlock>
  );
};

export default Item;