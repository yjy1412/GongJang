import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { editComment, fetchCreateComment, fetchRemoveComment, fetchUpdateComment, removeComment } from '../../feature/commentSlice';
import checkTime from '../../lib/Time';
import { RiArrowDownSFill } from 'react-icons/ri';

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
          padding: 0.3rem 0;
        }
      }
    }
    .btn-box {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      .open-reply {
        cursor: pointer;
        display: flex;
        align-items: center;
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

  const onEditCommentSubmit = async (e) => {
    e.preventDefault();
    if(editContent === ''){
      return;
    }
    const form = {
      comments_id: comment.id,
      post_id: post?.post_id,
      content: editContent,
    }
    await dispatch(fetchUpdateComment(form));
    await dispatch(editComment({
      id: comment.id,
      content: editContent
    }));
    setEdit(!edit);
  }

  const onRemoveComment = async () => {
    const form = { 
      post_id: post?.post_id,
      comments_id: comment.id
    }
    await dispatch(fetchRemoveComment(form));
    await dispatch(removeComment(comment.id));
  }

  const onSubmitReply = (e) => {
    e.preventDefault();
    //답글 데이터 만들어 보내기
    if(replyContent === ''){
      return;
    }
    const form = {
      content: replyContent,
      // post_id: post.post_id,
      // responseTo: ''
    };
    dispatch(fetchCreateComment(form));
    setReplyContent('');
  }

  useEffect(() => {
    if(comment){
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
          ><RiArrowDownSFill fill="#fa8072"/>답변 보기</span>
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