import React from 'react';
import styled from 'styled-components';
import SingleComment from './SingleComment';

const ReplyCommentBlock = styled.div`

`;

const ReplyComment = ({ commentList, parentCommentId }) => {
  return (
    <ReplyCommentBlock>
      { commentList.map((comment, index) => (
        comment.responseTo === parentCommentId && (
          <div>
            <SingleComment/>
            <ReplyComment/>
          </div>
        )
      ))}
    </ReplyCommentBlock>
  );
};

export default ReplyComment;