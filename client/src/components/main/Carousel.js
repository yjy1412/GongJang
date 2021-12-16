import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import game from '../../style/images/game.jpg';
import pollution from '../../style/images/pollution.jpg';
import CarouselImg from './CarouselImg';
import playing from '../../style/images/playing.jpg';

const CarouselWrapper = styled.div`
  position: relative;
  width: 60%;
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
      background: rgba(0, 0, 0, 0.356);
      cursor: pointer;

      .icon {
        color: rgb(119, 119, 119);
      }
    }
  }

  .prev {
    left: 0;
  };

  .next {
    right: 0;
  };

`;

const CarouselBlock = styled.div`
  position: relative;
  min-width: 100%;
  height: 80%;
  transition: .5s;
  overflow: hidden;
`;



const Carousel = () => {
  const images = [ game, playing, pollution ];
  const [index, setIndex] = useState(0); // 슬라이드 번호 부여 상태

  const onPrev = () => {
    setIndex(index + 100);
    index === 0 ? setIndex(-100 * (images.length - 1)) : setIndex(index + 100);
  };

  const onNext = () => {
    setIndex(index - 100);
    index === -100 * (images.length - 1) ? setIndex(0) : setIndex(index - 100);
  };



  return (
    <>
      <CarouselWrapper>
        {
          images.map((image, idx) => 
            <CarouselBlock key={idx} style={{transform: `translateX(${index}%)`}}>
              <CarouselImg image={image} key={idx} />
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