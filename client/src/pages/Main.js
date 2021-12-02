import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ItemList from '../components/main/ItemList';
import GameImg from '../components/main/GameImg';
import Loading from '../components/common/Loading';
import { fetchGetAllPosts } from '../feature/postsSlice';

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
`;

const Main = () => {
  const dispatch = useDispatch();
  const { posts, error, loading, } = useSelector(({ posts }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: posts.loading,
  }))

  useEffect(() => {
    dispatch(fetchGetAllPosts());
  },[dispatch])
  
  console.log(posts)
  // if(error){
  //   if(error.response && error.response.status === 404){
  //     return <MainBlock>나눔글이 존재하지 않습니다.</MainBlock>;
  //   }
  //   return <MainBlock>예상치 못한 오류가 발생했습니다.</MainBlock>;
  // }
  if(loading || !posts){
    return <Loading/>;
  }
  return (
    <MainBlock>
      <GameImg/>
      <div className="share-text">
        <h2>공.장 나눔 공간</h2>
      </div>
      <ItemList posts={posts} />
    </MainBlock>
  );
};

export default Main;