import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchGetAllrecomments } from '../../feature/commentSlice';
import SingleComment from './SingleComment';

const ReplyCommentBlock = styled.div`

`;

const ReplyComment = ({ post, user, parentCommentId, recommentList }) => {
  const [replyCommnetNum, setReplyCommentNum] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const form = {
      posts_id: post?.post_id,
      comments_id: parentCommentId
    }
    dispatch(fetchGetAllrecomments(form));
  },[dispatch, parentCommentId, post?.post_id])
  
  useEffect(() => {
    let recommentNum = 0;
    if(recommentList){
      recommentList.map((recomment) => {
        if(recomment.ref_comment === parentCommentId){
          recommentNum ++;
        }
        return recomment;
      })
    }
    setReplyCommentNum(recommentNum);
  },[recommentList, parentCommentId])

  const openReplyCommentsHandle = () => {
    setOpenReplyComments(!openReplyComments);
  }

  return (
    <ReplyCommentBlock>
      <div>
        { replyCommnetNum > 0 && (
          <p
           onClick={openReplyCommentsHandle}
           >답변 {replyCommnetNum}개 보기
          </p>
        )}
      </div>
      { openReplyComments && (
        recommentList.map(recomment => (
          <div key={recomment.id}>
            <SingleComment
              comment={recomment}
              post={post}
              user={user}
              />
              <ReplyComment
              recommentList={recommentList}
              post={post}
              user={user}
              parentCommentId={recomment.ref_comment}
              />
          </div>
        ))
      )}
    </ReplyCommentBlock>
  );
};

export default ReplyComment;