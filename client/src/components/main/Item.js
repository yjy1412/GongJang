import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { fetchRemoveWish, fetchWish } from '../../feature/wishSlice';
import { changeWish } from '../../feature/postsSlice';

const ItemBlock = styled.li`
  max-width: 250px;
  width: 100%;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5),
    2px 2px 5px rgba(94, 104, 121, 0.3);
  background: #ffdeb7;
  .item-img {
    height: 200px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      padding: 0.5rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .check-wish {
      cursor: pointer;
    }
  }
`;

const Item = ({ post, user, setModal, modal }) => {
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

  //이미지 없을 경우 기본 이미지 보여주기

  return (
    <ItemBlock>
      <div className="item-img">
        <Link to={`/${post?.id}`}>
          <img src={`data:image/png;base64,${post?.image[0]}`} alt="" />
        </Link>
      </div>
      <div className="item-info">
        <p>{post?.title}</p>
        <div 
        className="check-wish"
        onClick={onClickWish}
        >
          { post?.wish ? (
            <RiHeartFill fill="#f9796d"/>
          ) : (
            <RiHeartLine fill="#f9796d"/>
          )}
        </div>
      </div>
    </ItemBlock>
  );
};

export default Item;