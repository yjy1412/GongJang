import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Comments from '../components/postDetail/Comments';
import ItemImgSlide from '../components/postDetail/ItemImgSlide';
import { fetchGetPostDetail, unloadPost, fetchRemovePost, changeWishPost } from '../feature/postSlice';
import { setOriginalPost } from '../feature/writeSlice';
import Loading from '../components/common/Loading';
import AskModal from '../components/modal/AskModal';
import checkTime from '../lib/Time';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { fetchGetAllComments, unloadComment } from '../feature/commentSlice';
import { fetchRemoveWish, fetchWish } from '../feature/wishSlice';

const PostDetailBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
  .title {
    position: relative;
    border-bottom: 2px solid #575F95;
    margin: 3rem 0 2rem;
    h3 {
      text-align: center;
      width: 100%;
      font-size: 1.8rem;
    }
    .share-status {
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 1.2rem;
      color: #fff;
      background: #fa8072;
      padding: 0.5rem;
      border-radius: 4px;
    }
  }
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .info {
      padding: 0.8rem;
      color: #fff;
      background: #575F95;
      border-radius: 20px 20px 0 0;
      p {
        font-size: 1.2rem;
      }
    }
    button {
      font-size: 1.2rem;
      font-weight: 600;
      margin-left: 1rem;
      color: #575F95;
      padding: 0.5rem 0.5rem 0;
      cursor: pointer;
      transition: .3s;
      &:hover {
        color: #f9796d;
      }
    }
  }
  .desc {
    height: 400px;
    border: 2px solid #575F95;
    padding: 1rem 0;
    text-align: center;
    p {
      font-size: 1.4rem;
    }
  }
  .writer {
    margin-top: 0.5rem;
    .avatar {
      display: inline-flex;
      width: 30px;
      height: 30px;
      margin-right: 0.5rem;
      img {
        border-radius: 50%;
      }
    }
  }
  .interest {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    .heart {
      display: flex;
      padding: 0 0.5rem;
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 1024px){
    width: 100%;
    margin: 0;
    padding: 0 2rem;
  }
  @media only screen and (max-width: 768px){
    padding: 0 1rem;
  }
  @media only screen and (max-width: 425px){
    font-size: 1rem;
    .title {
      h3 {
        font-size: 1.4rem;
      }
      .share-status {
        font-size: 1rem;
      }
    }
    .wrap {
      .info {
        p {
          font-size: 1rem;
        }
      }
      button {
        font-size: 1rem;
      }
    }
    .desc {
      p {
        font-size: 1rem;
      }
    }
  }
`;

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ownPost, setOwnPost] = useState(false);
  const { post, loading, user, commentList, recommentList } = useSelector(({ post , user, comment }) => ({
    post: post.post,
    error: post.error,
    loading: post.loading,
    user: user.user,
    commentList: comment.commentList,
    recommentList: comment.recommentList
  }));

  useEffect(() => {
    if(user){
      if((user.nickname === post?.writer.writer_nickname) || user.admin === true){
        setOwnPost(true);
      }
    }
  },[post?.writer.writer_nickname, user])

  useEffect(() => {
    if(!user){
      dispatch(fetchGetPostDetail(id));
    } else {
      dispatch(fetchGetPostDetail(id));
      dispatch(fetchGetAllComments(id));
    }
    return () => {
      dispatch(unloadPost());
      dispatch(unloadComment());
    }
  },[dispatch, id, user])

  const onEditPost = useCallback(() => {
    dispatch(setOriginalPost(post));
    history.push('/write');
  },[dispatch, history, post])

  const onCancel = () => {
    setModal(!modal);
  }

  const onConfirm = async () => {
    try {
      await dispatch(fetchRemovePost(id));
      history.push('/');
    } catch(e){
      console.log(e)
    }
  }

  const onLoginCancel = () => {
    setVisible(!visible);
  }

  const onLoginConfirm = () => {
    history.push('/login')
  }

  const onClickWish = useCallback(() => {
    if(!user){
      setVisible(!visible);
    }
    if(user){
      if(post?.wish){
        dispatch(fetchRemoveWish(post?.post_id));
        dispatch(changeWishPost(post?.wish));
      } else {
        dispatch(fetchWish(post?.post_id));
        dispatch(changeWishPost(post?.wish));
      }
    }
  },[dispatch, post?.post_id, post?.wish, user, visible])

  const onClickInput = () => {
    if(!user){
      setVisible(!visible);
    }
  }

  const date = checkTime(post?.createdAt);
  
  if(loading || !post){
    return <Loading/>;
  }
  return (
    <>
      <PostDetailBlock>
        <div className="title">
          <h3>{post?.title}</h3>
          { post?.soldOut && (
            <div className="share-status">
              <b>나눔완료</b>
            </div>
          )}
        </div>
        <ItemImgSlide post={post}/>
        <div className="wrap">
          <div className="info">
            <p>ITEM INFO</p>
          </div>
          { ownPost && (
            <div className="btn-box">
              <button onClick={onEditPost}>EDIT</button>
              <button onClick={() => setModal(!modal)}>DELETE</button>
            </div>
          )}
        </div>
        <div className="desc">
          <p>{post?.content}</p>
        </div>
        <div className="writer">
          <span><b>{post?.writer.writer_nickname}&nbsp;</b></span>
          <span> {date}</span>
        </div>
        <div className="interest">
          <div>
            <span>댓글</span>
            <span> {commentList ? commentList.length : 0}</span>
          </div>
          <div className="heart" onClick={onClickWish}>
            { post?.wish ? (
              <RiHeartFill fill="#f9796d"/>
            ) : (
              <RiHeartLine fill="#f9796d"/>
            )}
             
          </div>
        </div>
        <Comments
        post={post}
        user={user}
        commentList={commentList}
        recommentList={recommentList}
        onClickInput={onClickInput}
        />
      </PostDetailBlock>
      { modal && (
        <AskModal
        visible={modal}
        title='나눔 글 삭제'
        description='나눔 글을 정말 삭제하시겠습니까?'
        onConfirm={onConfirm}
        onCancel={onCancel}
        />
      )}
      { visible && (
        <AskModal 
        visible={visible}
        title='알림'
        description='로그인이 필요한 서비스입니다.'
        addDescription='로그인 하시겠습니까?'
        onConfirm={onLoginConfirm}
        onCancel={onLoginCancel} 
        /> 
      )}
    </>
  );
};

export default PostDetail;