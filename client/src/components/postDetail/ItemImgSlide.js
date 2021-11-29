import React, { useState } from 'react';
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
const data = [1,2,3];
const ItemImgSlide = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = data[activeIndex];

  const prevHandler = () => {
    activeIndex <= 0 ? 
    setActiveIndex(data.length - 1) : 
    setActiveIndex((oldIndex) => oldIndex - 1);
  }

  const nextHandler = () => {
    activeIndex >= data.length - 1 ? 
    setActiveIndex(0) : 
    setActiveIndex((oldIndex) => oldIndex + 1);
  }

  return (
    <ItemImgSlideBlock>
      <div className="slide">
        <p>test{activeSlide}</p>
        <img src="" alt="" />
        <div 
        className="prev"
        tabIndex={0}
        onClick={prevHandler}
        >
          <HiOutlineChevronLeft/>
        </div>
        <div 
        className="next"
        tabIndex={1}
        onClick={nextHandler}
        >
          <HiOutlineChevronRight/>
        </div>
      </div>
    </ItemImgSlideBlock>
  );
};

export default ItemImgSlide;