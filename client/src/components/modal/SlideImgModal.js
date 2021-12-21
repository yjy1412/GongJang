import React from 'react';
import styled from 'styled-components';

const SlideImgModalBlock = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const ImgBox = styled.div`
  position: relative;
  width: 30%;
  display: flex;
  background: orange;
  img {
    width: 100%;
  }
`;

const SlideImgModal = ({ activeSlide, onClickSlideImg }) => {
  return (
    <SlideImgModalBlock onClick={onClickSlideImg}>
      <ImgBox>
        <img src={activeSlide} alt="나눔 이미지" />
      </ImgBox>
    </SlideImgModalBlock>
  );
};

export default SlideImgModal;