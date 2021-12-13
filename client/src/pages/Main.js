import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ItemList from '../components/main/ItemList';
import GameImg from '../components/main/GameImg';
import Loading from '../components/common/Loading';
import { fetchGetAllPosts } from '../feature/postsSlice';
import AskModal from '../components/modal/AskModal';

const MainBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
  .share-text {
    position: relative;
    text-align: center;
    padding: 2rem 0;
    &:after,
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      height: 2px;
      width: 50px;
      background: #575f95;
    }
    &:after {
      left: 35%;
    }
    &:before {
      right: 35%;
    }
  }
  @media only screen and (max-width: 1024px){
    width: 100%;
    margin: 0;
    padding: 0 2rem;
  }
  @media only screen and (max-width: 768px){
    padding: 0 1rem;
    .share-text:after {
      left: 27%;
    }
    .share-text:before {
      right: 27%;
    }
  }
  @media only screen and (max-width: 425px){
    .share-text:after,
    .share-text:before {
      display: none;
    }
  }
`;

const Main = () => {
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { posts, loading, user } = useSelector(({ posts, user }) => ({
    posts: posts.posts,
    loading: posts.loading,
    user: user.user,
  }))

  const onCancel = () => {
    setModal(!modal);
  }

  const onConfirm = () => {
    setModal(!modal);
    history.push('/login');
  }

  useEffect(() => {
    if(!user){
      dispatch(fetchGetAllPosts());
    } else {
      dispatch(fetchGetAllPosts());
    }
  },[dispatch, user]);
  
  if(loading || posts.length === 0){
    return <Loading/>;
  }
  return (
    <>
      <MainBlock>
        <GameImg/>
        <div className="share-text">
          <h2>공.장 나눔 공간</h2>
        </div>
        <ItemList 
        posts={posts} 
        user={user} 
        modal={modal}
        setModal={setModal}
        />
        
      </MainBlock>
      { modal && (
        <AskModal 
        visible={modal}
        title='알림'
        description='로그인이 필요한 서비스입니다.'
        addDescription='로그인 하시겠습니까?'
        onConfirm={onConfirm}
        onCancel={onCancel}
        />
      )}
    </>
  );
};

export default Main;