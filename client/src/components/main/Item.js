import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { fetchRemoveWish, fetchWish } from '../../feature/wishSlice';
import { changeWish } from '../../feature/postsSlice';
import DefaultImg from '../../style/images/defaultImg.png';

const ItemBlock = styled.li`
  max-width: 250px;
  width: 100%;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5),
    2px 2px 5px rgba(94, 104, 121, 0.3);
  background: #ffdeb7;
  padding: 0.5rem;
  .item-img {
    position: relative;
    height: 200px;
    overflow: hidden;
    a {
      display: block;
      width: 100%;
      height: 100%;
      transform: scale(1);
      transition: .3s;
      img {
        width: 100%;
        height: 100%;
      }
      &:hover {
        transform: scale(1.1);
      }
    }
    .sold-out {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(218, 220, 236, 0.7);
      display: none;
      justify-content: flex-end;
      align-items: flex-end;
      pointer-events: none;
      span {
        color: #fff;
        background:#f9796d;
        padding: 0 0.2rem 0.1rem;
        border-radius: 4px 0 0 0 ;
      }
    }
    .sold-out.show {
      display: flex;
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
  @media only screen and (max-width: 1024px){
    max-width: 450px;
    .item-img {
      height: 370px;
    }
  }
  @media only screen and (max-width: 768px){
    max-width: 340px;
    .item-img {
      max-height: 300px;
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

  return (
    <ItemBlock>
      <div className="item-img">
        <Link to={`/${post?.id}`}>
          { post?.image[0] === "" ? (
            <img src={DefaultImg} alt="나눔 기본 이미지"/>
          ) : (
            <img src={`data:image/png;base64,${post?.image[0]}`} alt="나눔 이미지" />
          ) }
        </Link>
        <div className={post?.soldOut ? "sold-out show" : "sold-out"}>
          <span>나눔완료</span>
        </div>
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