import React,{ useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import UpdateProfile from '../components/mypage/UpdateProfile';
import AskAccountDeleteModal from '../components/modal/AskAccountDeleteModal'
import { fetchDeleteAccount, fetchLogOut } from '../feature/userSlice';

const MyPageBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
  .wrap {
    margin-top: 45px;
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
    .btn-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-left: 1rem;
      span {
        padding: 0.5rem 0.5rem 0;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        color: black;
      }
    }
  }

  .profile-wrap {
    padding: 10px 70px;
    display: flex;
  }
`;

const DeleteButton = styled.button`
  font-size: 1.2rem;
  font-weight: 600;
  /* text-decoration-line: underline; */
  color: #575F95;
  padding: 0.5rem 0.5rem 0;
  cursor: pointer;
  margin-bottom: 0.5rem;
`;

const MyPageProfileImg = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 200px;
    height: 200px;
    border-radius: 100px;
  }

  span {
    margin-top: 5px;
    text-align: center;
    cursor: pointer;
  }
`;

const MyPage = () => {

  const [ newNickname, setNewNickname ] = useState('');
  const [ newProfileImage, setNewProfileImage ] = useState(null);
  const [visible, setVisible] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  
  const { user, isEdited, userInfoError } = useSelector( state => state.user );

  const handleProfileImage = () => {
    alert("하이")
  }

  const handleDeleteButton = () => {
    setVisible(true)
  }

  const onCancel = () => {
    setVisible(false);
  }

  const onConfirm = () => {
    setVisible(false);
    dispatch(fetchDeleteAccount(user));
    dispatch(fetchLogOut());
    history.replace('/')
  }

  return (
    <>
      <MyPageBlock>
        <div className="profile-wrap">
          <MyPageProfileImg>
            <div>
              <img 
                src="https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200008/91087328-%EC%97%AC%EC%84%B1%EC%9A%A9-%EA%B8%B0%EB%B3%B8-%EC%95%84%EB%B0%94%ED%83%80-%ED%94%84%EB%A1%9C%ED%95%84-%EC%95%84%EC%9D%B4%EC%BD%98-%ED%9A%8C%EC%83%89-%EC%82%AC%EC%A7%84-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C-%EC%9E%90-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%B2%A1%ED%84%B0.jpg?ver=6" 
                alt="profile" 
              />
            </div>
            <span>사진 업데이트하기</span>
          </MyPageProfileImg>
          <UpdateProfile 
          user={user}
          isEdited={isEdited}
          userInfoError={userInfoError}
          newNickname={newNickname}
          setNewNickname={setNewNickname}
          />
        </div>
        <div className="wrap">
          <div className="info">
            <p>MY ITEM LIST</p>
          </div>
          <div className="btn-box">
            <span>계정을 삭제하시겠습니까?</span>
            <DeleteButton onClick={handleDeleteButton}>DELETE ACCOUNT</DeleteButton>
          </div>
        </div>
      </MyPageBlock>
      { 
        visible && (
        <AskAccountDeleteModal visible={visible} onConfirm={onConfirm} onCancel={onCancel}
        />
      )}
    </>
  );
};

export default MyPage;