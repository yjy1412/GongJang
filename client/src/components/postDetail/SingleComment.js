import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { editComment, fetchCreaterecomment, fetchRemoveComment, fetchUpdateComment, removeComment } from '../../feature/commentSlice';
import checkTime from '../../lib/Time';

const SingleCommentBlock = styled.div`
  .single-comment-wrap {
    margin-bottom: 0.5rem;
    .comment {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .text {
        width: 100%;
        border-bottom: 2px solid #575F95;
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
      justify-content: space-between;
      .open-reply {
        cursor: pointer;
        display: flex;
        align-items: center;
        color: #575F95;
        transition: .3s;
        &:hover {
          color: #f9796d;
        }
      }
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
      color: inherit;
      border-bottom: 2px solid #575F95;
      &::placeholder {
        color: #bcbdc4;
        font-size: 1rem;
      }
      &:focus {
        
      }
    }
    button {
      cursor: pointer;
      color: inherit;
      font-size: 1rem;
      transition: .3s;
      &:hover {
        color: #f9796d;
      }
    }
  }
`;

const SingleComment = ({ post, comment, user }) => {
  const [openReply, setOpenReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [permission, setPermission] = useState(false);
  const dispatch = useDispatch();

  const onChangeReply = (e) => {
    setReplyContent(e.target.value);
  }

  // 코멘트 수정
  const onEditComment = (e) => {
    setEditContent(e.target.value);
  }

  const onEditCommentSubmit = useCallback(async (e) => {
    e.preventDefault();
    if(editContent === ''){
      return;
    }
    const form = {
      comment_id: comment.id,
      post_id: post?.post_id,
      content: editContent,
    }
    await dispatch(fetchUpdateComment(form));
    await dispatch(editComment({
      id: comment.id,
      content: editContent
    }));
    setEdit(!edit);
  },[comment.id, dispatch, edit, editContent, post?.post_id])

  const onRemoveComment = useCallback(async () => {
    const form = { 
      post_id: post?.post_id,
      comment_id: comment.id
    }
    await dispatch(fetchRemoveComment(form));
    await dispatch(removeComment(comment.id));
  },[comment.id, dispatch, post?.post_id])

  const onSubmitReply = useCallback(async e => {
    e.preventDefault();
    //답글 데이터 만들어 보내기
    if(replyContent === ''){
      return;
    }
    const form = {
      content: replyContent,
      post_id: post?.post_id,
      comment_id: comment.id,
    };
    await dispatch(fetchCreaterecomment(form))
    setOpenReply(false);
    setReplyContent('');
  },[comment.id, dispatch, post?.post_id, replyContent])

  useEffect(() => {
    if(user){
      if(user?.nickname === comment?.User.nickname){
        setPermission(true);
      } else {
        setPermission(false);
      }
    }
  },[comment, user])

  return (
    <SingleCommentBlock>
      <div className="single-comment-wrap">
        <div>
          <span><b>{comment.User.nickname}&nbsp;</b></span>
          <span> {checkTime(comment.createdAt)}</span>
        </div>
        <div className="comment">
          <div className="text">
            { comment.isDelete ? (
              <p style={{color: "#bcbdc4"}}>삭제된 글입니다.</p>
            ) : (
               edit ? (
                <textarea
                type="text"
                value={editContent}
                onChange={onEditComment}
                />    
              ) : (
                <p>{comment.content}</p>
              )
            )}
          </div>
        </div>
        <div className="btn-box">
          <span 
          onClick={() => setOpenReply(!openReply)} 
          className="open-reply"
          >답변하기</span>
          { !comment.isDelete && (
            permission && (
              <>
                <div className={edit ? "edit-btn hide" : "edit-btn"}>
                  <button onClick={() => setEdit(!edit)}>수정</button>
                  <button onClick={onRemoveComment}>삭제</button>
                </div>
                <div className={!edit ? "edit-btn hide" : "edit-btn"}>
                  <button type="submit" onClick={onEditCommentSubmit}>수정</button>
                  <button onClick={() => setEdit(!edit)}>취소</button>
                </div>
              </>
          ))}
        </div>
      </div>
      { openReply && (
        <form className="reply-box" onSubmit={onSubmitReply}>
          <textarea 
          placeholder="답변을 입력하세요."
          value={replyContent}
          onChange={onChangeReply}
          />
          <button type="submit"><b>REPLY</b></button>
        </form>
      )}
    </SingleCommentBlock>
  );
};

export default SingleComment;