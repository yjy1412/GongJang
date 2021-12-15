import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import SlideImgModal from '../modal/SlideImgModal';
import DefaultImg from '../../style/images/defaultImg.png';

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
      width: 100%;
      height: 100%;
      display: flex;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
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

const ItemImgSlide = ({ post }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState(false);

  const dataFilter = post?.image.filter(el => el !== "");
  const data = dataFilter.map(el => {
    return `data:image/*;base64,${el}`;
  })
  const activeSlide = data[activeIndex];

  const prevHandler = useCallback(() => {
    activeIndex <= 0 ? 
    setActiveIndex(data.length - 1) : 
    setActiveIndex((oldIndex) => oldIndex - 1);
  },[activeIndex, data.length])

  const nextHandler = useCallback(() => {
    activeIndex >= data.length - 1 ? 
    setActiveIndex(0) : 
    setActiveIndex((oldIndex) => oldIndex + 1);
  },[activeIndex, data.length])

  const onClickSlideImg = () => {
    setModal(!modal);
  }

  return (
    <ItemImgSlideBlock>
      <div className="slide-box">
          <div className="slide" onClick={onClickSlideImg}>
            { !activeSlide ? (
              <img src={DefaultImg} alt="나눔 기본 이미지"/>
            ) : (
              <img src={activeSlide} alt="나눔 이미지" />
              )}
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