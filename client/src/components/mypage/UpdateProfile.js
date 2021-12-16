import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { changeNickname, fetchUpdateUserInfo, initialize } from '../../feature/userSlice';
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
  .update-password {
    display: flex;
    align-items: center;
    p {
      width: 354px;
      height: 40px;
      border-bottom: solid 1.2px #D4D4D4;
      font-size: 24px;
      margin-right: 20px;
    }
  }
  @media only screen and (max-width: 425px){
    margin-left: 0;
    h1 {
      font-size: 1.3rem;
      text-align: center;
      margin-bottom: 1rem;
      span {
        font-size: inherit;
      }
    }
    input, span {
      width: 100%;
      font-size: 1rem;
      margin-right: 0;
    }
    .update-password {
      flex-direction: column;
      align-items: flex-start;
      p {
        width: 100%;
        font-size: 1rem;
        margin-right: 0;
        padding-top: 0.5rem;
      }
    }
  }
`;

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
  @media only screen and (max-width: 425px){
    div {
      margin-bottom: 1rem;
    }
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: end;
  right: 297px;
  font-size: 13px;
  color: #fa8072;
`;


const UpdateProfile = ({ user, userInfoError, isEdited, setNewNickname, newNickname }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const handleNewNickname = (e) => {
    setNewNickname(e.target.value);
  }
  
  const handleEditButton = () => {
    if(newNickname) {
      setVisible(true)
    }
  }

  const onCancel = () => {
    setVisible(false);
  }

  const onConfirm = () => {
    setVisible(false);
    dispatch(fetchUpdateUserInfo(newNickname));
    dispatch(changeNickname(newNickname));
    setNewNickname('');
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      if(newNickname) {
        setVisible(true)
      }
    }
  }
  useEffect(() => {
    if(isEdited){
      history.push('/mypage');
      setServerErrorMessage("");
    }
    if(userInfoError){
      setServerErrorMessage(userInfoError);
    }
    return () => { //언마운트될 때 초기화
      dispatch(initialize());
    }
  },[dispatch, history, isEdited, userInfoError])

  return (
    <>
      <UpdateProfileBlock>
        <h1><span>{user ? user.nickname : ""}</span> 님, 안녕하세요.</h1>
        <UpdateProfileForm onKeyPress={onKeyPress}>
          <div className="update-nickname">
            <input 
              type="text" 
              name="newNickname"
              placeholder="닉네임을 수정하세요."
              value={newNickname}
              onChange={handleNewNickname}
            />
            <span onClick={handleEditButton}>EDIT</span>
            <ErrorMessage>{serverErrorMessage}</ErrorMessage>
          </div>
          <div className="update-password">
            <p>PASSWORD</p>
            <Link to="/updatePassword">EDIT</Link>
          </div>
        </UpdateProfileForm>
      </UpdateProfileBlock>
      {
        visible && ( 
        <AskEditModal 
        visible={visible} 
        onCancel={onCancel} 
        onConfirm={onConfirm} 
        /> 
        )
      }
    </>
  );
};

export default UpdateProfile;