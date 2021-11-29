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

const AuthLoginBlock = styled.div`
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
    margin-bottom: 10px;
  };
`;

const AuthLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  .auth-input-box {
    position: relative;
    margin-top: 30px;
    display: flex;
    align-items: end;
    justify-content: space-between;
  };

  input {
    font-size: 15px;
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
  margin-top: 50px;
`;

const LoginButton = styled(Button)`
  width: 310px;
  height: 30px;
  font-weight: 500;
`;

const JoinButton = styled(Button)`
  margin-top: 5px;
  width: 310px;
  height: 30px;
  color: #575f95;
  background-color: white;
  border: solid 1px #575f95;
  font-weight: 500;
`;

const Login = () => {
  
  // 로그인 입력 정보
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  // 오류메시지
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const handleInputEmail = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name] : e.target.value});
    const { email } = loginInfo;
    const testEmail = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(!testEmail.test(email)) {
      setEmailMessage('올바르지 않은 이메일 형식입니다');
    } else {
      setEmailMessage('');
    }
  };

  const handleInputPassword = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name] : e.target.value});
    const testPassword = /(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if(!testPassword.test(e.target.value)){
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 16자리 이하로 입력해주세요');
    } else {
      setPasswordMessage('');
    }
  }

  const handleSubmit = (e) => {
    const { email, password } = loginInfo;
    if(emailMessage === "" && passwordMessage === "") {
      axios.post('http://localhost:4000/auth/log-in', { email, password }, { headers: { 'Content-Type': 'application/json' } })
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
  };

  return (
    <AuthBackground>
      <AuthLoginBlock>
        <div className="auth-title">
          Login
        </div>
        <AuthLoginForm>
          <div className="auth-input-box">
            <div className="auth-input-title">
              email
            </div>
            <input
              className="auth-input"
              autoComplete="off"
              name="email"
              type="email"
              value={loginInfo.email}
              onChange={handleInputEmail}
            />
          <Message email>{emailMessage}</Message>
          </div>
          <div className="auth-input-box">
            <div className="auth-input-title">
              password
            </div>
            <input
              className="auth-input"
              name="password"
              type="password"
              value={loginInfo.password}
              onChange={handleInputPassword}
            />
          <Message>{passwordMessage}</Message>
          </div>
        </AuthLoginForm>
        <Buttons>
          <LoginButton onClick={handleSubmit}>LOGIN</LoginButton>
          <Link to="/join">
            <JoinButton className="cancel" >JOIN</JoinButton>
          </Link>
        </Buttons>
        <ErrorMessage>{serverErrorMessage}</ErrorMessage>
      </AuthLoginBlock>
    </AuthBackground>
  );
};

export default Login;