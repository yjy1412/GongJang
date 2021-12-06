import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { fetchRemoveWish, fetchWish } from '../../feature/wishSlice';
import AskModal from '../modal/AskModal';
import { changeWish } from '../../feature/postsSlice';
import TestImg from '../../style/images/testImg.jpg';

const ItemBlock = styled.li`
  max-width: 250px;
  width: 100%;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5),
    2px 2px 5px rgba(94, 104, 121, 0.3);
  background: #ffdeb7;
  .item-img {
    height: 150px;
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

const Item = ({ post, user }) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickWish = () => {
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
  }

  const onCancel = () => {
    setModal(!modal);
  }

  const onConfirm = () => {
    setModal(!modal);
    history.push('/login');
  }

  //이미지 없을 경우 기본 이미지 보여주기

  return (
    <ItemBlock>
      <div className="item-img">
        <Link to={`/${post?.id}`}>
          <img src={TestImg} alt="" />
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
    </ItemBlock>
  );
};

export default Item;