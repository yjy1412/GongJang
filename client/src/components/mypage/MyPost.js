import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { fetchRemovePost } from '../../feature/postSlice';
const MyPostBlock = styled.div`
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
      position: relative;
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
        border-radius: 9px 0 0 0 ;
      }
    }
    .sold-out.show {
      display: flex;
    }
    .close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.5rem;
      cursor: pointer;
    }
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
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

const MyPost = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onRemove = async () => {
    try {
      await dispatch(fetchRemovePost(post?.id));
      history.push('/');
    } catch(e){
      console.log(e)
    }
  }
  
  return (
    <MyPostBlock>
      <div className="item-img">
        <Link to={`/${post?.id}`}>
          <img src={`data:image/png;base64,${post?.image[0]}`} alt="" />
        </Link>
        <div className={post?.soldOut ? "sold-out show" : "sold-out"}>
          <span>나눔완료</span>
        </div>
        <div className="close" onClick={onRemove}>
          <FaTimes/>
        </div>
      </div>
    <div className="item-info">
      <p>{post?.title}</p>
    </div>
    </MyPostBlock>
  );
};

export default MyPost;