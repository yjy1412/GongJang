import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import game from '../../style/images/game.jpg';
import CarouselImg from './CarouselImg';
import donate from '../../style/images/donate.png';
import chat from '../../style/images/chat.png';

const CarouselWrapper = styled.div`
  position: relative;
  width: 70%;
  height: 60vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  

  .button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 8%;
    height: 80%;
    background: none;
    border: none;
    outline: none;
    transition: .5s;
    &:hover {
      cursor: pointer;

      .icon {
        color: rgb(119, 119, 119);
      }
    }
  };

  .prev {
    left: 0;
  };

  .next {
    right: 0;
  };

  @media only screen and (max-width: 1024px){ // ~ 타블렛
    width: 90%;
  }
  @media only screen and (max-width: 768px){ // ~ 모바일
    width: 100%;
  }
`;

const CarouselBlock = styled.div`
  position: relative;
  min-width: 100%;
  height: 80%;
  transition: .5s;
  overflow: hidden;
  text-align: right;
  .carousel-text {
    width: min-content;
    font-size: 45px;
    font-weight: 700;
    position: absolute;
    text-align: left;
    top: 140px;
    left: 80px;
    z-index: 99;
    min-width: 30%;
    max-width: 30%;
    @media only screen and (max-width: 1024px){ // ~ 타블렛
      font-size: 40px;
      min-width: 35%;
      max-width: 35%;
    }
    @media only screen and (max-width: 768px){ // ~ 모바일
      font-size: 35px
    }

    .carousel-text-third {
      font-weight: 800;
      color: #fa8072;
    }
  }
  img {
    margin-right: 65px;
  }


`;



const Carousel = () => {
  const images = [ game, chat, donate ];
  const [index, setIndex] = useState(0); // 슬라이드 번호 부여 상태

  const onPrev = () => {
    setIndex(index + 100);
    index === 0 ? setIndex(-100 * (images.length - 1)) : setIndex(index + 100);
  };

  const onNext = () => {
    setIndex(index - 100);
    index === -100 * (images.length - 1) ? setIndex(0) : setIndex(index - 100);
  };
  const firstText = '중고 장난감';
  const firstText2 = '공유 플랫폼';
  const firstText3 = '공.장';
  const secondText = '비밀 댓글로'
  const secondText2 = '소통하는';
  const secondText3 = '공.장';
  const thirdText = '환경 문제에';
  const thirdText2 = '앞장서는';
  const thirdText3 = '공.장';
  
  const carouselTexts = [
    [
      firstText,
      firstText2,
      firstText3 
    ],
    [ 
      secondText,
      secondText2,
      secondText3
    ],
    [
      thirdText, 
      thirdText2,
      thirdText3
    
    ]
    
  ]

  return (
    <>
      <CarouselWrapper>
        {
          images.map((image, idx) => 
            <CarouselBlock key={idx} style={{transform: `translateX(${index}%)`}}>
              <CarouselImg image={image} key={idx} text={carouselTexts[idx]} />
            </CarouselBlock>
          )
        }
        <button onClick={onPrev} className="button prev"><IoIosArrowBack className="icon" size="25px"/></button>
        <button onClick={onNext} className="button next"><IoIosArrowForward className="icon" size="25px" /></button>
      </CarouselWrapper>
    </>
  );
};

export default Carousel;