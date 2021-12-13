import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { useDispatch } from 'react-redux';
import { fetchCreateComment, fetchGetAllComments } from '../../feature/commentSlice';

const CommentsBlock = styled.div`
  padding-bottom: 3rem;
  .comment-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    textarea {
      width: 100%;
      height: 45px;
      resize: none;
      font-size: 1.2rem;
      margin-right: 1rem;
      padding: 0.5rem; 
      border: 2px solid #575F95;
      border-radius: 4px;
      &::placeholder {
        color: #bcbdc4;
        font-size: 1rem;
      }
    }
  }
`;

const CommentBtn = styled(Button)`
  padding: 0.8rem;
`;

const Comments = ({ post, commentList, onClickInput, user }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const onChangeComment = (e) => {
    setComment(e.target.value)
  }

  const onSubmitComment = async (e) => {
    e.preventDefault();
    if(comment === ''){
      return;
    }
    //댓글 데이터 만들어 보내기
    const form = {
      content: comment,
      post_id: post.post_id,
    };
    await dispatch(fetchCreateComment(form));
    await dispatch(fetchGetAllComments(post.post_id));
    setComment('');
  }

  return (
      <CommentsBlock>
        {/* root comment */}
        <form className="comment-box" onSubmit={onSubmitComment}>
          <textarea 
          type="text" 
          placeholder="나눔 아이템에 대해 궁금한 점 남겨주세요."
          value={comment}
          onChange={onChangeComment}
          onClick={onClickInput}
          />
          <CommentBtn>COMMENT</CommentBtn>
        </form>
        {/* comments Lists */}
        { commentList && (
          commentList.map((comment, index) => !comment.responseTo && (
            <div key={index}>
              <SingleComment
              comment={comment}
              post={post}
              user={user}
              />
              {/* <ReplayComment
              commentList={commentList}
              writerInfo={writerInfo}
              parentCommentId={comment.id}
              /> */}
            </div>
          ))
        )}
        <ReplyComment/>
      </CommentsBlock>
  );
};

export default Comments;