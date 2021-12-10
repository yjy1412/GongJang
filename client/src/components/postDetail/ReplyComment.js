import React from 'react';
import styled from 'styled-components';

const ReplyCommentBlock = styled.div`

`;

const ReplyComment = () => {
  return (
    <ReplyCommentBlock>
      {/* { commentList.map((comment, index) => (
        comment.responseTo === parentCommentId && (
          <div>
            <SingleComment/>
            <ReplyComment/>
          </div>
        )
      ))} */}
    </ReplyCommentBlock>
  );
};

export default ReplyComment;