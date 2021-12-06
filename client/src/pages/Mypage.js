import React,{ useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector, useDispatch} from 'react-redux';
import UpdateProfile from '../components/mypage/UpdateProfile';
import AskAccountDeleteModal from '../components/modal/AskAccountDeleteModal'
import { fetchDeleteAccount, fetchLogOut } from '../feature/userSlice';
import MyPageProfileImg from '../components/mypage/MyPageProfileImg';

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



const MyPage = () => {

  const [ newNickname, setNewNickname ] = useState('');
  const [ previewProfileImage, setPreviewProfileImage ] = useState(null);
  const [visible, setVisible] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  
  const { user, isEdited, userInfoError } = useSelector( state => state.user );

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
          <MyPageProfileImg 
            user={user}
            isEdited={isEdited}
            userInfoError={userInfoError}
            previewProfileImage={previewProfileImage}
            setPreviewProfileImage={setPreviewProfileImage}
          />
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