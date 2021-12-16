import React,{ useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector, useDispatch} from 'react-redux';
import UpdateProfile from '../components/mypage/UpdateProfile';
import AskAccountDeleteModal from '../components/modal/AskAccountDeleteModal'
import { fetchDeleteAccount, fetchLogOut } from '../feature/userSlice';
import MyPageProfileImg from '../components/mypage/MyPageProfileImg';
import MyPosts from '../components/mypage/MyPosts'

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
      align-items: flex-start;
      margin-left: 1rem;
      span {
        padding: 0.5rem 0.5rem 0;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }
    }
  }
  .profile-wrap {
    padding: 30px 70px;
    display: flex;
  }
  @media only screen and (max-width: 1024px){
    width: 100%;
    margin: 0;
    padding: 0 2rem;
  }
  @media only screen and (max-width: 768px){
    padding: 0 1rem;
    .profile-wrap {
      padding: 0;
    }
  }
  @media only screen and (max-width: 425px){
    .wrap {
      margin-top: 1rem;
      .info {
        p {
          font-size: 1rem;
        }
      }
      .btn-box {
        span {
          font-size: 0.8rem;
          margin-bottom: 0;
        }
        button {
          font-size: 1rem;
        }
      }
    }
    .profile-wrap {
      flex-direction: column;
    }
  }
`;

const DeleteButton = styled.button`
  font-size: 1.2rem;
  font-weight: 600;
  color: #575F95;
  padding: 0.5rem 0.5rem 0;
  cursor: pointer;
  margin-bottom: 0.5rem;
`;



const MyPage = () => {

  const [ newNickname, setNewNickname ] = useState('');
  const [ previewProfileImage, setPreviewProfileImage ] = useState('');
  const [visible, setVisible] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  
  const { user, isEdited, userInfoError } = useSelector( state => state.user );
  const { myposts } = useSelector( state => state.posts)

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
        <MyPosts 
          myposts={myposts}
        />
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