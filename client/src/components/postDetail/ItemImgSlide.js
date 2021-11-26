import React from 'react';
import styled from 'styled-components';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const ItemImgSlideBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  .slide {
    position: relative;
    max-width: 280px;
    width: 100%;
    height: 280px;
    background: #ffdeb7;
    .prev {
      left: -4rem;
    }
    .next {
      right: -4rem;
    }
    .prev, 
    .next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.5rem;
      padding: 0.5rem;
      cursor: pointer;
    }
  }
`;

const ItemImgSlide = () => {
  return (
    <ItemImgSlideBlock>
      <div className="slide">
        <img src="" alt="" />
        <div className="prev">
          <HiOutlineChevronLeft/>
        </div>
        <div className="next">
          <HiOutlineChevronRight/>
        </div>
      </div>
    </ItemImgSlideBlock>
  );
};

export default ItemImgSlide;