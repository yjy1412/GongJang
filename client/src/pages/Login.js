import React from 'react';
import styled from 'styled-components';

const AuthBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display:flex;
  justify-content: center;
  align-items: center;
`

const AuthLoginBlock = styled.div`
  border-radius: 15px;
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

const AuthLoginForm = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  .auth-input-box {
    margin-top: 30px;
    display: flex;
    align-items: end;
    justify-content: space-between;
  }

  input {
    font-size: 15px;
    width: 180px;
    border-bottom: solid 1.25px #D8D9DE;
  }

  .input-title {
    display: flex;
    font-size: 15px;
  }
`;

const Login = () => {
  return (
    <AuthBackground>
      <AuthLoginBlock>
        <div className="auth-title">
          Login
        </div>
        <AuthLoginForm>
          <div className="auth-input-box">
            <div className="input-title">
              email
            </div>
            <input
              className="auth-input"
              name="email"
              type="email"
              /* value={} */
              /* onChange={} */
            />
          </div>
          <div className="auth-input-box">
            <div className="input-title">
              password
            </div>
            <input
              className="auth-input"
              name="password"
              type="password"
              /* value={} */
              /* onChange={} */
            />
          </div>
        </AuthLoginForm>
      </AuthLoginBlock>
    </AuthBackground>
  );
};

export default Login;