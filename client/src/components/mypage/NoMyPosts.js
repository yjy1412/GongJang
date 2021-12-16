import React from 'react';
import styled from 'styled-components';
import { BsFillEmojiExpressionlessFill } from 'react-icons/bs'
const NoMyPosts = () => {

  const NoResultBlock = styled.div`
  height: 80vh;
  position: relative;
  .no-result-box {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 200px;
    min-width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .no-result-icon { 
    font-size: 150px;
  }

  .no-result-message {
    margin-top: 30px;
    font-size: 25px;
    width: 100%;
    display: flex;
    justify-content: center;
    
    span {
      text-align: center;
    }
  }
`;

  return (
    <NoResultBlock>
      <div className="no-result-box">
        <BsFillEmojiExpressionlessFill className="no-result-icon"/>
        <div className="no-result-message ">
          <span>내가 쓴 글이 존재하지 않습니다.</span>
        </div>
      </div>
    </NoResultBlock>
  );
};

export default NoMyPosts;