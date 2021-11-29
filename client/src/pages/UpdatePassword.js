import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/Button';
import axios from 'axios';

const AuthBackground = styled.div`
  margin-top: 200px;
  margin-bottom: 255px;
  display:flex;
  justify-content: center;
  align-items: center;
`

const AuthUpdatePasswordBlock = styled.div`
  border-radius: 10px;
  padding: 25px;
  width: 360px;
  height: 300px;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);

  .auth-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #575f95;
    font-weight: 700;
  };
`;

const AuthUpdatePasswordForm = styled.div`
  display: flex;
  flex-direction: column;
  .auth-input-box {
    position: relative;
    margin-top: 20px;
    display: flex;
    align-items: end;
    justify-content: space-between;
  }

  input {
    width: 180px;
    font-size: 25px;
    border-bottom: solid 1.25px #D8D9DE;
  }

  .auth-input-title {
    display: flex;
    font-size: 15px;
  }
`;

const Message = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  display: flex;
  justify-content: end;
  font-size: 10px;
  color: red;
  margin-left: 2px;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 12px;
  color: red;
  margin-left: 2px;
`;

const Buttons = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
`

const CancelButton = styled(Button)`
  width: 150px;
  height: 30px;
  color: #575f95;
  background-color: white;
  border: solid 1px #575f95;
  font-weight: 500;
`

const UpdatePasswordButton = styled(Button)`
  width: 150px;
  height: 30px;
  font-weight: 500;
`

const UpdatePassword = () => {

  const [ updatePasswordInfo, setUpdatePasswordInfo ] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 오류 메세지
  const [ newPasswordMessage, setNewPasswordMessage ] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const handleInputCurrentPassword = (e) => {
    setUpdatePasswordInfo({ ...updatePasswordInfo, [e.target.name] : e.target.value});
  };

  const handleInputNewPassword = (e) => {
    setUpdatePasswordInfo({ ...updatePasswordInfo, [e.target.name] : e.target.value});
    const testPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if(!testPassword.test(e.target.value)){
      setNewPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 16자리 이하로 입력해주세요');
    } else {
      setNewPasswordMessage('');
    }
  };

  const handleInputConfirmPassword = (e) => {
    setUpdatePasswordInfo({ ...updatePasswordInfo, [e.target.name] : e.target.value});
    const { newPassword } = updatePasswordInfo;
    if(e.target.value !== newPassword) {
      setConfirmPasswordMessage('비밀번호가 일치하지 않습니다')
    } else {
      setConfirmPasswordMessage('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newpassword } = updatePasswordInfo;
    if(newPasswordMessage === "" && confirmPasswordMessage === "") {
      axios.post('http://localhost:4000/auth/password', { currentPassword, newpassword }, { headers: { 'Content-Type': 'application/json' } })
        .then((data) => {
            // 로그인 창으로 이동합니다.
            console.log('서버응답')
            // history.push("/login")
        })
        .catch((err) => {
            // Todo: 서버로부터 받은 응답을 에러메시지에 삽입하여 나타냄
            setServerErrorMessage('유효하지 않은 요청입니다')
            setTimeout(() => setServerErrorMessage(''), 3000)
        })
    } else {
      e.preventDefault();
    }
  }

  return (
    <AuthBackground>
      <AuthUpdatePasswordBlock>
        <div className="auth-title">
          Update Password
        </div>
        <AuthUpdatePasswordForm>
          <div className="auth-input-box">
            <div className="auth-input-title">
              current password
            </div>
            <input
              className="auth-input"
              name="currentPassword"
              type="password"
              value={updatePasswordInfo.currentPassword}
              onChange={handleInputCurrentPassword}
            />
          </div>
          <div className="auth-input-box">
            <div className="auth-input-title">
              new password
            </div>
            <input
              className="auth-input"
              name="newPassword"
              type="password"
              value={updatePasswordInfo.newPassword}
              onChange={handleInputNewPassword}
            />
            <Message>{newPasswordMessage}</Message>
          </div>
          <div className="auth-input-box">
            <div className="auth-input-title">
              confirm password
            </div>
            <input
              className="auth-input"
              name="confirmPassword"
              type="password"
              value={updatePasswordInfo.confirmPassword}
              onChange={handleInputConfirmPassword}
            />
            <Message>{confirmPasswordMessage}</Message>
          </div>
        </AuthUpdatePasswordForm>
        <Buttons>
          <Link to="/mypage">
          <CancelButton>CANCEL</CancelButton>
          </Link>
          <UpdatePasswordButton onClick={handleSubmit}>UPDATE</UpdatePasswordButton>
        </Buttons>
        <ErrorMessage>{serverErrorMessage}</ErrorMessage>
      </AuthUpdatePasswordBlock>
    </AuthBackground>
  );
};

export default UpdatePassword;