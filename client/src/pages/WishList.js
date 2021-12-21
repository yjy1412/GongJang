import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Wish from '../components/wishlist/Wish';
import { fetchGetAllPosts } from '../feature/postsSlice';

const WishListBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
  .title {
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
    .title:after {
      left: 27%;
    }
    .title:before {
      right: 27%;
    }
  }
  @media only screen and (max-width: 425px){
    .title:after,
    .title:before {
      display: none;
    }
  }
`;

const WishList = () => {
  const [modal, setModal] = useState(false);
  const { posts, user, wish } = useSelector(({ posts, user, wish }) => ({
    posts: posts.posts,
    user: user.user,
    wish: wish.wish
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllPosts());
  },[dispatch])

  return (
    <WishListBlock>
      <div className="title">
        <h2>Wish List</h2>
      </div>
      <Wish 
      posts={posts}
      user={user}
      wish={wish}
      modal={modal}
      setModal={setModal}
      />
    </WishListBlock>
  );
};

export default WishList;