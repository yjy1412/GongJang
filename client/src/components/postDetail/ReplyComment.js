import React from 'react';
import styled from 'styled-components';

const ReplyCommentBlock = styled.div`

`;

const ReplyComment = () => {
  return (
    <ReplyCommentBlock>
      {/* { commentList.map((comment, index) => (
        답글들만 렌더링 됨
        comment.responseTo === parentCommentId && (
          <div style={{marginLeft: '30px'}}>
            <SingleComment/>
            <ReplyComment/>
          </div>
        )
      ))} */}
    </ReplyCommentBlock>
  );
};

export default ReplyComment;