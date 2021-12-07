import React, { useState } from 'react';
import styled from 'styled-components';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import SlideImgModal from '../modal/SlideImgModal';

const ItemImgSlideBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  .slide-box {
    position: relative;
    max-width: 280px;
    width: 100%;
    height: 280px;
    background: #ffdeb7;
    .slide {
      position: relative;
      display: flex;
      img {
        position: absolute;
        width: 100%;
        cursor: pointer;
      }
    }
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

const ItemImgSlide = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState(false);

  const data = images.map(el => {
    const ss = btoa(String.fromCharCode(...new Uint8Array(el)));
    return `data:image/png;base64,${ss}`;
  })
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

  const onClickSlideImg = () => {
    setModal(!modal);
  }

  //업로드한 이미지 없을 경우 기본 이미지 보여주기 

  return (
    <ItemImgSlideBlock>
      <div className="slide-box">
          <div className="slide" onClick={onClickSlideImg}>
            <img src={activeSlide} alt="나눔 이미지" />
          </div>
        <div 
        className="prev"
        onClick={prevHandler}
        >
          <HiOutlineChevronLeft/>
        </div>
        <div 
        className="next"
        onClick={nextHandler}
        >
          <HiOutlineChevronRight/>
        </div>
      </div>
      { modal && (
        <SlideImgModal
        activeSlide={activeSlide}
        onClickSlideImg={onClickSlideImg}
        />
      )}
    </ItemImgSlideBlock>
  );
};

export default ItemImgSlide;