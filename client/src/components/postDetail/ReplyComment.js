import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchGetAllrecomments } from '../../feature/commentSlice';
import ReplyContent from './ReplyContent';
import { RiArrowDownSFill } from 'react-icons/ri';

const ReplyCommentBlock = styled.div`
  .reply-count {
    margin-bottom: 0.5rem;
    cursor: pointer;
    span {
      color: #f9796d;
    }
  }
`;

const ReplyComment = ({ post, user, parentCommentId, recommentList }) => {
  const [replyCommentNum, setReplyCommentNum] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const form = {
      post_id: post?.post_id,
      comment_id: parentCommentId
    }
      dispatch(fetchGetAllrecomments(form));
  },[dispatch, parentCommentId, post?.post_id, user])
  
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
        { replyCommentNum > 0 && (
          <p
          className="reply-count"
           onClick={openReplyCommentsHandle}
           ><RiArrowDownSFill fill="#fa8072"/>답변 <span>{replyCommentNum}</span>개 보기
          </p>
        )}
        { openReplyComments && (
          recommentList.map(recomment => recomment.ref_comment === parentCommentId && (
            <ReplyContent
            key={recomment.id}
            post={post}
            user={user}
            recomment={recomment}
            parentCommentId={parentCommentId}
            />
          ))
        )}
      </div>
    </ReplyCommentBlock>
  );
};

export default ReplyComment;