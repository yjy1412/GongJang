import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { fetchRemoveWish, fetchWish } from '../../feature/wishSlice';
import { changeWish } from '../../feature/postsSlice';

const ItemBlock = styled.li`
  max-width: 250px;
  width: 100%;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5),
    2px 2px 5px rgba(94, 104, 121, 0.3);
  .item-img {
    position: relative;
    height: 150px;
    background: #ffdeb7;
    a {
      display: block;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1rem;
      cursor: pointer;
    }
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
`;
const WishItem = ({ wish, post, posts, user, key, setModal, modal }) => {

  const dispatch = useDispatch();

  const onClickWish = useCallback(() => {
    if(!user){
      setModal(!modal);
    }
    if(user){
      if(post?.wish){
        dispatch(fetchRemoveWish(post?.id));
        dispatch(changeWish(post?.id));
      } else {
        dispatch(fetchWish(post?.id));
        dispatch(changeWish(post?.id));
      }
    }
  },[dispatch, modal, post?.id, post?.wish, setModal, user])
  
  const test = post?.image[0].data;
  const base64String = btoa(String.fromCharCode(...new Uint8Array(test)));
  return (
    <ItemBlock>
    <div className="item-img">
      <Link to={`/${post?.id}`}>
      <img src={`data:image/png;base64,${base64String}`} alt="" />
      </Link>
    </div>
    <div className="item-info">
      <p>{post?.title}</p>
      <div 
        className="check-wish"
        onClick={onClickWish}
        >
          { post?.wish ? (
            <RiHeartFill fill="red"/>
          ) : (
            <RiHeartLine fill="red"/>
          )}
        </div>
    </div>
  </ItemBlock>  
  );
};

export default WishItem;