import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchMypage, fetchUpdateUserInfo } from '../../feature/userSlice';
import AskEditModal from '../modal/AskEditModal';

const UpdateProfileBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-left: 140px;

  input {
    width: 354px;
    height: 40px;
    border-bottom: solid 1.2px #D4D4D4;
    font-size: 24px;
    margin-right: 20px;
  }
`

const UpdateProfileForm = styled.div`

  div {
    margin-bottom: 30px;
  }

  .update-nickname {
    position: relative;

    span {
      cursor: pointer;
    }
  }
`

const ErrorMessage = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: end;
  right: 297px;
  font-size: 14px;
  color: #fa8072;
`;


const UpdateProfile = () => {
  
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, isEdited, userInfoError } = useSelector( state => state.user);

  const [visible, setVisible] = useState(false);

  const [ newUserInfo, setNewUserInfo ] = useState({
    newNickname : "",
    profileImage: null,
  });

  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const handleUpdateUserInfo = () => {
    dispatch(fetchUpdateUserInfo(newUserInfo));
    setNewUserInfo({
      newNickname: "",
      profileImage: null,
    })
  }
  
  const handleNewNickname = (e) => {
    setNewUserInfo({ ...newUserInfo, [e.target.name] : e.target.value});
  }

  const handleEditButton = () => {
    setVisible(true)
  }

  const onCancel = () => {
    setVisible(false);
    history.replace('/mypage');
  }

  const onConfirm = () => {
    setVisible(false);
    handleUpdateUserInfo();
    history.replace('/mypage')
  }

  useEffect(() => {
    dispatch(fetchMypage());                                      
  }, [dispatch]);

  useEffect(() => {
    if(isEdited){
      history.push('/mypage');
    }
    if(userInfoError){
      setServerErrorMessage(userInfoError);
      setTimeout(() => setServerErrorMessage(''), 3000)
    }
  },[history, isEdited, userInfoError])

  return (
    <>
      <UpdateProfileBlock>
        <h1><span>{user ? user.userInfo.nickname : ""}</span> 님, 안녕하세요.</h1>
        <UpdateProfileForm>
          <div className="update-nickname">
            <input 
              type="text" 
              name="newNickname"
              placeholder="닉네임을 수정하세요."
              value={newUserInfo.newNickname}
              onChange={handleNewNickname}
            />
            <span onClick={handleEditButton}>EDIT</span>
            <ErrorMessage>{serverErrorMessage}</ErrorMessage>
          </div>
          <div className="update-password">
            <input 
              type="text"
              value="PASSWORD"
            />
            <Link to="/updatePassword">EDIT</Link>
          </div>
        </UpdateProfileForm>
      </UpdateProfileBlock>
      {
        visible ? <AskEditModal visible={visible} onCancel={onCancel} onConfirm={onConfirm} /> : null
      }
    </>
  );
};

export default UpdateProfile;