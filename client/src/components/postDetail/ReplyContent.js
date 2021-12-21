import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import checkTime from '../../lib/Time';
import { BsArrowReturnRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { editRecomment, fetchRemoverecomment, fetchUpdatrecomment, removeRecomment } from '../../feature/commentSlice';

const ReplyContentBlock = styled.div`
  margin-left: 1.3rem;
  .user-info svg {
    margin-bottom: -0.2rem;
  }
  .reply-content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid #575F95;
    .text {
      width: 100%;
      margin-left: 1rem;
      textarea {
        width: 100%;
        height: 35px;
        resize: none;
        color: inherit;
        font-size: 1rem;
        padding: 0.5rem 0;
      }
    }
  }
  .btn-box {
    display: flex;
    justify-content: flex-end;
    font-size: 0.8rem;
    .edit-btn {
      button {
        color: inherit;
        margin-left: 1rem;
        cursor: pointer;
      }
    }
    .edit-btn.hide {
      display: none;
    }
  }
`;

const ReplyContent = ({ post, user, recomment, parentCommentId}) => {
  const [replyEdit, setReplyEdit] = useState(false);
  const [replyEditContent, setReplyEditContent] = useState(recomment.content);
  const [ownReply, setOwnReply] = useState(false);

  const dispatch = useDispatch();

  const onEditReply = (e) => {
    setReplyEditContent(e.target.value);
  }

  const onEditRecommentSubmit = useCallback(async (e) => {
    e.preventDefault();
    if(replyEditContent === ''){
      return;
    }
    const form = {
      comment_id: parentCommentId,
      post_id: post?.post_id,
      content: replyEditContent,
      recomment_id: recomment.id
    }
    await dispatch(fetchUpdatrecomment(form));
    await dispatch(editRecomment({
      id: recomment.id,
      content: replyEditContent
    }));
    setReplyEdit(!replyEdit);
  },[dispatch, parentCommentId, post?.post_id, recomment.id, replyEdit, replyEditContent])

  const onRemoveRecomment = useCallback(async () => {
    const form = { 
      post_id: post?.post_id,
      comment_id: parentCommentId, 
      recomment_id: recomment.id,
    }
    await dispatch(fetchRemoverecomment(form));
    await dispatch(removeRecomment(recomment.id));
  },[dispatch, parentCommentId, post?.post_id, recomment.id])

  useEffect(() => {
    if(user){
      if(user?.nickname === recomment?.User.nickname || user?.admin === true){
        setOwnReply(true);
      } else {
        setOwnReply(false);
      }
    }
  },[recomment?.User.nickname, user])

  return (
    <ReplyContentBlock>
      <div className="user-info">
        <span><BsArrowReturnRight/>&nbsp;<b>{recomment.User.nickname}&nbsp;</b></span>
        <span> {checkTime(recomment.createdAt)}</span>
      </div>
      <div className="reply-content">
        <div className="text">
          { recomment.isDelete ? (
            <p style={{color: "#bcbdc4"}}>삭제된 글입니다.</p>
          ) : (
            replyEdit ? (
              <textarea
              type="text"
              value={replyEditContent}
              onChange={onEditReply}
              />    
            ) : (
              <p>{recomment.content}</p>
            )
          )}
        </div>
      </div>
      <div className="btn-box">
        { !recomment.isDelete && (
          ownReply && (
            <>
              <div className={replyEdit ? "edit-btn hide" : "edit-btn"}>
                <button onClick={() => setReplyEdit(!replyEdit)}>수정</button>
                <button onClick={onRemoveRecomment}>삭제</button>
              </div>
              <div className={!replyEdit ? "edit-btn hide" : "edit-btn"}>
                <button type="submit" onClick={onEditRecommentSubmit}>수정</button>
                <button onClick={() => setReplyEdit(!replyEdit)}>취소</button>
              </div>
            </>
        ))}
      </div>
    </ReplyContentBlock>
  );
};

export default ReplyContent;