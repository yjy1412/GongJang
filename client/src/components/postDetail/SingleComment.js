import React, { useState } from 'react';
import styled from 'styled-components';

const SingleCommentBlock = styled.div`

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
        <span onClick={openReply}>답글</span>
      </div>
      { openReply && (
        <form onSubmit={onSubmitReoly}>
          <textarea 
          placeholder=""
          value={replyContent}
          onChange={onChangeReply}
          />
          <button>COMMENT</button>
        </form>
      )}
    </SingleCommentBlock>
  );
};

export default SingleComment;