import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchGetMyPosts } from '../../feature/postsSlice';
import MyPost from './MyPost';

const MyPostsBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  gap: 2.7rem;
  flex-wrap: wrap;
  padding: 2rem 0 4rem;
  @media only screen and (max-width: 1024px){
    width: 100%;
    margin: 0;
    padding: 2rem 0;
    gap: 2.8rem;
  }
  @media only screen and (max-width: 768px){
    padding: 2rem 0;
    width: 100%;
    gap: 2.5rem;
  }
`;

const MyPosts = ({ myposts }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetMyPosts());
  }, [dispatch])

  return (
    <MyPostsBlock>
      {
        myposts.map((post, idx) => 
          <MyPost 
          post={post}
          key={post?.id}
          />
        )
      }
    </MyPostsBlock>
  );
};

export default MyPosts;