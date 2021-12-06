import React from 'react';
import styled from 'styled-components';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { AiOutlineMore } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
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
      cursor: pointer;
    }
  }
  .comment-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    textarea {
      width: 100%;
      height: 45px;
      resize: none;
      font-size: 1.2rem;
      margin-right: 1rem;
      padding: 0.5rem; 
      border: 2px solid #575F95;
      border-radius: 4px;
      &::placeholder {
        color: #bcbdc4;
        font-size: 1rem;
      }
    }
  }
  .comment {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .text {
      width: 100%;
      font-size: 1.2rem;
      margin-top: 0.5rem;
      border-bottom: 2px solid #575F95;
    }
    .comment-edit {
      font-size: 1.5rem;
      cursor: pointer;
    }
    .comment-edit-icons {
      position: absolute;
      right: -2rem;
      display: none;
      flex-direction: column;
      gap: 0.5rem;
      border: 1px solid #575F95;
      padding: 0.5rem;
      cursor: pointer;
    }
  }
`;

const CommentBtn = styled(Button)`
  padding: 0.8rem;
`;

const Comments = () => {

  const onChangeComment = (e) => {
    console.log(e.target.value)
  }

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
          <textarea 
          type="text" 
          placeholder="나눔 아이템에 대해 궁금한 점 남겨주세요."
          name=""
          value=""
          onChange={onChangeComment}
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
                <div className="text">
                  <p>comment</p>
                </div>
                <AiOutlineMore className="comment-edit"/>
                <div className="comment-edit-icons">
                  <FiEdit/>
                  <RiDeleteBinLine/>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </CommentsBlock>
  );
};

export default Comments;