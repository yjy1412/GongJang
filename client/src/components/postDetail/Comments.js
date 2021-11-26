import React from 'react';
import styled from 'styled-components';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { AiOutlineMore } from 'react-icons/ai';
import Button from '../common/Button';

const CommentsBlock = styled.div`
  padding: 1rem 0 3rem;
  .interest {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    .heart {
      display: flex;
      padding: 0 0.5rem;
    }
  }
  .comment-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    input {
      width: 100%;
      font-size: 1.2rem;
      margin-right: 1rem;
      padding: 0.7rem 0.5rem;
      background: #ffdeb7;
      border-radius: 4px;
      &::placeholder {
        color: #bcbdc4;
      }
    }
  }
  .comment {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    div {
      width: 100%;
      font-size: 1.2rem;
      margin-top: 0.5rem;
      border-bottom: 1px solid #575F95;
    }
    .comment-edit {
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
`;

const CommentBtn = styled(Button)`
  padding: 0.8rem;
`;

const Comments = () => {
  return (
    <CommentsBlock>
      <div className="interest">
        <div>
          <span>댓글</span>
          <span>1</span>
        </div>
        <div className="heart">
          <RiHeartFill fill="red"/>
        </div>
      </div>
      <div className="comment-box">
        <input 
        type="text" 
        placeholder="나눔 아이템에 대해 궁금한 점 남겨주세요."
        name=""
        value=""
        />
        <CommentBtn>COMMENT</CommentBtn>
      </div>
      <ul>
        <li>
          <div>
            <div>
              <span><b>nickname</b></span>
              <span> 2021.11.24</span>
            </div>
            <div className="comment">
              <div>comment</div>
              <AiOutlineMore className="comment-edit"/>
            </div>
          </div>
        </li>
      </ul>
    </CommentsBlock>
  );
};

export default Comments;