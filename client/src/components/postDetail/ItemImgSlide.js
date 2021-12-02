import React, { useEffect, useState, useRef } from 'react';
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

const data = [
  'https://i.picsum.photos/id/355/200/200.jpg?hmac=3rHDkz_9bWmvte4NNnIGZon7PIHrM6NQYzXtVY7M_UI',
  'https://i.picsum.photos/id/501/200/200.jpg?hmac=tKXe69j4tHhkAA_Qc3XinkTuubEWwkFVhA9TR4TmCG8',
  'https://i.picsum.photos/id/502/200/200.jpg?hmac=c6mcZ5mcmjadIeDKaJClpvPz9R9-X9q6c0Un-n73Kv4',
]
const ItemImgSlide = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = data[activeIndex];
  const [modal, setModal] = useState(false);

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