import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchCreateComment, fetchRemoveComment, removeComment } from '../../feature/commentSlice';
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
        input {
          width: 100%;
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
        span {
          margin-left: 1rem;
          cursor: pointer;
        }
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

const SingleComment = ({ post, comment }) => {
  const [openReply, setOpenReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  // const [editComment, setEditComment] = useState(comment.content);
  const dispatch = useDispatch();

  const onChangeReply = (e) => {
    setReplyContent(e.target.value);
  }

  // 코멘트 수정
  // const onEditComment = (e) => {
  //   setEditComment(e.target.value);
  // }

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
              <p>{comment.content}</p>
            )}
            {/* <input
            type="text"
            value={editComment}
            onChange={onEditComment}
            /> */}
          </div>
        </div>
        <div className="btn-box">
          <span 
          onClick={() => setOpenReply(!openReply)} 
          className="open-reply"
          ><RiArrowDownSFill fill="#fa8072"/>답변 보기</span>
          { !comment.isDelete && (
            <div className="edit-btn">
              <span>수정</span>
              <span onClick={onRemoveComment}>삭제</span>
            </div>
          )}
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