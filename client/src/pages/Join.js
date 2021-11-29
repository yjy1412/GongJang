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

const AuthJoinBlock = styled.div`
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

const AuthJoinForm = styled.div`
  display: flex;
  flex-direction: column;
  .auth-input-box {
    margin-top: 25px;
    display: flex;
    align-items: end;
    justify-content: space-between;
  }

  input {
    width: 180px;
    border-bottom: solid 1.25px #D8D9DE;
  }

  .input-title {
    display: flex;
    font-size: 15px;
  }
`;

const Join = () => {
  return (
    <AuthBackground>
      <AuthJoinBlock>
        <div className="auth-title">
          Join
        </div>
        <AuthJoinForm>
          <div className="auth-input-box">
            <div className="input-title">
              nickname
            </div>
            <input
              className="auth-input"
              name="email"
              type="text"
              /* value={} */
              /* onChange={} */
            />
          </div>
          <div className="auth-input-box">
            <div className="input-title">
              email
            </div>
            <input
              className="auth-input"
              name="password"
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
          <div className="auth-input-box">
            <div className="input-title">
              confirm password
            </div>
            <input
              className="auth-input"
              name="password"
              type="password"
              /* value={} */
              /* onChange={} */
            />
          </div>
        </AuthJoinForm>
      </AuthJoinBlock>
    </AuthBackground>
  );
};

export default Join;