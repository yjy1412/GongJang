import React from 'react';
import styled from 'styled-components';
import UdateProfile from '../components/mypage/UdateProfile';

const MyPageBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid #575F95;
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
`;

const MyPageProfileImg = styled.div`

`;

const MyPage = () => {

  return (
    <MyPageBlock>
      <div className="profile-wrap">
        <MyPageProfileImg>
          <div>
            <img src="" alt="" />
          </div>
          <p>profile update</p>
        </MyPageProfileImg>
        <UdateProfile/>
      </div>
      <div className="wrap">
        <div className="info">
          <p>MY ITEM LIST</p>
        </div>
        <div className="btn-box">
          <button>DELETE ACCOUNT</button>
        </div>
      </div>
    </MyPageBlock>
  );
};

export default MyPage;