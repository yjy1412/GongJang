import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Comments from '../components/postDetail/Comments';
import ItemImgSlide from '../components/postDetail/ItemImgSlide';
import { fetchGetPostDetail, unloadPost, fetchRemovePost } from '../feature/postSlice';
import { setOriginalPost } from '../feature/writeSlice';
import Loading from '../components/common/Loading';
import AskModal from '../components/modal/AskModal';
import checkTime from '../components/postDetail/Time';

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
    span {
    }
  }
`;

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const { post, loading, user, images } = useSelector(({ post , user }) => ({
    post: post.post,
    error: post.error,
    loading: post.loading,
    user: user.user,
    images: post.images,
  }));

  useEffect(() => {
    dispatch(fetchGetPostDetail(id));
    return () => {
      dispatch(unloadPost());
    }
  },[dispatch, id])

  const onEditPost = () => {
    dispatch(setOriginalPost(post));
    history.push('/write');
  }

  const onCancel = () => {
    setModal(!modal);
  }

  const onConfirm = async () => {
    try {
      await dispatch(fetchRemovePost(id));
      await history.push('/');
    } catch(e){
      console.log(e)
    }
  }

  const date = checkTime(post?.createdAt);
  
  const ownPost = (user && user.nickname) === (post && post?.writer.writer_nickname);
  
  // if(error){
  //   if(error.response && error.response.status === 404){
  //     return <PostDetailBlock>나눔글이 존재하지 않습니다.</PostDetailBlock>;
  //   }
  //   return <PostDetailBlock>예상치 못한 오류가 발생했습니다.</PostDetailBlock>;
  // }
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
        <ItemImgSlide images={images}/>
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
        <Comments/>
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
    </>
  );
};

export default PostDetail;