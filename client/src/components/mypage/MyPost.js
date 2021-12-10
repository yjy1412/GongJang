import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { fetchRemovePost } from '../../feature/postSlice';
const MyPostBlock = styled.div`
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
`

const MyPost = ({ posts, post, user, key}) => {
  const { id } = useParams();
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