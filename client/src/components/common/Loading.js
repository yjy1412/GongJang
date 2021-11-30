import React from 'react';
import styled from 'styled-components';
import LoadingImg from '../../style/images/loadingImage.gif';

const LoadingBlock = styled.div`
  height: 80vh;
  position: relative;
  .loading-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    img {
      width: 100%;
    }
  }
`;

const Loading = () => {
  return (
    <LoadingBlock>
      <div className="loading-img">
        <img src={LoadingImg} alt="로딩이미지" />
      </div>
    </LoadingBlock>
  );
};

export default Loading;