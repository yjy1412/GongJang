import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

const AuthJoinBlock = styled.div`
  border-radius: 10px;
  padding: 25px;
  width: 360px;
  height: 300px;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  .auth-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #575f95;
    font-weight: 700;
  };
`;

const AuthJoinForm = styled.div`
  display: flex;
  flex-direction: column;

  .auth-input-box {
    position: relative;
    margin-top: 25px;
    display: flex;
    align-items: end;
    justify-content: space-between;
  };

  input {
    width: 180px;
    border-bottom: solid 1.25px #D8D9DE;
  };

  .auth-input-title {
    display: flex;
    font-size: 15px;
  };
`;

const Message = styled.div`
  position: absolute;
  right: 0;
  top: 20px;
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
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled(Button)`
  width: 150px;
  height: 30px;
  color: #575f95;
  background-color: white;
  border: solid 1px #575f95;
  font-weight: 500;
`;

const JoinButton = styled(Button)`
  width: 150px;
  height: 30px;
  font-weight: 500;
`;

const Join = () => {

  // useHistory 사용 변수 
  const history = useHistory();

  // 이름, 이메일, 비밀번호, 비밀번호 확인 
  const [joinInfo, setJoinInfo] = useState({ 
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // 오류메시지
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  // 닉네임 핸들링 함수
  const handleInputNickname = (e) => {
    setJoinInfo({ ...joinInfo, [e.target.name] : e.target.value });
    const testNickname = /[a-zA-Z0-9_-]{4,12}$/;
    if (!testNickname.test(e.target.value)) { 
      setNicknameMessage('영문(대/소), 숫자 4-12자리 내로 입력해주세요');
    } else {
      setNicknameMessage('');
    }
  }; 

  const handleInputEmail = (e) => {
    setJoinInfo({...joinInfo, [e.target.name] : e.target.value});
    const { email } = joinInfo;
    const testEmail = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(!testEmail.test(email)) {
      setEmailMessage('올바르지 않은 이메일 형식입니다');
    } else {
      setEmailMessage('');
    }
  };
  
  const handleInputPassword = (e) => {
    setJoinInfo({...joinInfo, [e.target.name] : e.target.value});
    const testPassword = /(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if(!testPassword.test(e.target.value)){
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 16자리 이하로 입력해주세요');
    } else {
      setPasswordMessage('');
    }
  };

  const handleInputConfirmPassword = (e) => {
    setJoinInfo({...joinInfo, [e.target.name] : e.target.value});
    const { password } = joinInfo;
    if(e.target.value !== password ) {
      setConfirmPasswordMessage('비밀번호가 일치하지 않습니다')
    } else {
      setConfirmPasswordMessage('');
    }
  };
  
  const handleSubmit = (e) => {
    const { nickname, email, password } = joinInfo;
    if(nicknameMessage === "" && emailMessage === "" && passwordMessage === "" && confirmPasswordMessage === "") {
      axios.post('http://localhost:4000/auth/sign-up', { nickname, email, password }, { headers: { 'Content-Type': 'application/json' } })
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
      <AuthJoinBlock>
        <div className="auth-title">
          Join
        </div>
        <AuthJoinForm>
          <div className="auth-input-box">
            <div className="auth-input-title">
              nickname
            </div>
            <input
              className="auth-input"
              autoComplete="off"
              name="nickname"
              type="text"
              value={joinInfo.nickname}
              onChange={handleInputNickname}
            />
          <Message>{nicknameMessage}</Message>
          </div>
          <div className="auth-input-box">
            <div className="auth-input-title">
              email
            </div>
            <input
              className="auth-input"
              autoComplete="off"
              name="email"
              type="email"
              value={joinInfo.email}
              onChange={handleInputEmail}
            />
          <Message>{emailMessage}</Message>
          </div>
          <div className="auth-input-box">
            <div className="auth-input-title">
              password
            </div>
            <input
              className="auth-input"
              name="password"
              type="password"
              value={joinInfo.password}
              onChange={handleInputPassword}
            />
          <Message>{passwordMessage}</Message>
          </div>
          <div className="auth-input-box">
            <div className="auth-input-title">
              confirm password
            </div>
            <input
              className="auth-input"
              name="confirmPassword"
              type="password"
              value={joinInfo.confirmPassword}
              onChange={handleInputConfirmPassword}
            />
            <Message>{confirmPasswordMessage}</Message>
          </div>
        </AuthJoinForm>
        <Buttons>
          <Link to="/login">
          <CancelButton>CANCEL</CancelButton>
          </Link>
          <JoinButton onClick={handleSubmit}>JOIN</JoinButton>
        </Buttons>
        <ErrorMessage>{serverErrorMessage}</ErrorMessage>
      </AuthJoinBlock>
    </AuthBackground>
  );
};

export default Join;