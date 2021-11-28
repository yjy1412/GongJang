import React from 'react';
import styled from 'styled-components';
import Comments from '../components/postDetail/Comments';
import ItemImgSlide from '../components/postDetail/ItemImgSlide';

const PostDetailBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
  .title {
    position: relative;
    border-bottom: 2px solid #575F95;
    margin: 3rem 0 2rem;
    h3 {
      text-align: center;
      width: 100%;
      font-size: 2rem;
    }
    .writer {
      position: absolute;
      right: 0;
      bottom: 0;
      span {
        margin-left: 0.5rem;
      }
    }
  }
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .info {
      padding: 0.8rem;
      color: #fff;
      background: #575F95;
      border-radius: 20px 20px 0 0;
      p {
        font-size: 1.2rem;
      }
    }
    button {
      font-size: 1.2rem;
      font-weight: 600;
      margin-left: 1rem;
      color: #575F95;
      padding: 0.5rem 0.5rem 0;
      cursor: pointer;
    }
  }
  .desc {
    height: 400px;
    border: 2px solid #575F95;
    padding: 1rem 0;
    text-align: center;
    p {
      font-size: 1.4rem;
    }
  }
`;

const PostDetail = () => {
  /*
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    특정 페이지 정보 요청
  })
  */
  return (
    <PostDetailBlock>
      <div className="title">
        <h3>title</h3>
        <div className="writer">
          <span><b>nickname</b></span>
          <span>2021.11.23</span>
        </div>
      </div>
      <ItemImgSlide/>
      <div className="wrap">
        <div className="info">
          <p>ITEM INFO</p>
        </div>
        <div className="btn-box">
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </div>
      <div className="desc">
        <p>Description</p>
      </div>
      <Comments/>
    </PostDetailBlock>
  );
};

export default PostDetail;