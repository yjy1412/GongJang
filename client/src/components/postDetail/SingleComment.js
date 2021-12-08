import React, { useState } from 'react';
import styled from 'styled-components';

const SingleCommentBlock = styled.div`
  .open-reply {
    cursor: pointer;
    font-size: 1.1rem;
  }
  .reply-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 0.5rem;
    textarea {
      width: 100%;
      height: 45px;
      resize: none;
      font-size: 1.2rem;
      margin-right: 1rem;
      padding: 0.5rem 0; 
      border: none;
      border-bottom: 2px solid #575F95;
      &::placeholder {
        color: #bcbdc4;
        font-size: 1rem;
      }
    }
    button {
      cursor: pointer;
      color: inherit;
      font-size: 1rem;
    }
  }
`;

const SingleComment = () => {
  const [openReply, setOpenReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const onChangeReply = (e) => {
    setReplyContent(e.target.value);
  }

  const onSubmitReoly = (e) => {
    e.preventDefault();
    //답글 데이터 만들어 보내기
  }

  return (
    <SingleCommentBlock>
      <div>
        <div>
          <span><b>nickname</b></span>
          <span> 2021.11.24</span>
        </div>
        <div className="comment">
          <div className="text">
            <p>comment</p>
          </div>
        </div>
        <span 
        onClick={() => setOpenReply(!openReply)} 
        className="open-reply"
        >답글 보기</span>
      </div>
      { openReply && (
        <form className="reply-box" onSubmit={onSubmitReoly}>
          <textarea 
          placeholder="답글을 입력하세요."
          value={replyContent}
          onChange={onChangeReply}
          />
          <button><b>REPLY</b></button>
        </form>
      )}
    </SingleCommentBlock>
  );
};

export default SingleComment;