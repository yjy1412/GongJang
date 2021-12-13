import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SingleComment from './SingleComment';

const ReplyCommentBlock = styled.div`

`;

const ReplyComment = ({ commentList, post, user, parentCommentId }) => {
  const [replyCommnetNum, setReplyCommentNum] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);
  
  useEffect(() => {
    let commentNum = 0;
    if(commentList){
      commentList.map((comment) => {
        if(comment.ref_comment === parentCommentId){
          commentNum ++;
        }
        return comment;
      })
    }
    setReplyCommentNum(commentNum);
  },[commentList, parentCommentId])

  const openReplyCommentsHandle = () => {
    setOpenReplyComments(!openReplyComments);
  }

  return (
    <ReplyCommentBlock>
      <div>
        { replyCommnetNum > 0 && (
          <p
           onClick={openReplyCommentsHandle}
           >view {replyCommnetNum} more comment(s)
          </p>
        )}
      </div>
      { openReplyComments && (
        commentList.map(comment => (
          <div key={comment.id}>
            <SingleComment
              comment={comment}
              post={post}
              user={user}
              />
              <ReplyComment
              commentList={commentList}
              post={post}
              user={user}
              parentCommentId={comment.id}
              />
          </div>
        ))
      )}
    </ReplyCommentBlock>
  );
};

export default ReplyComment;