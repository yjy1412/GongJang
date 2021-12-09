import React from 'react';
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import google from '../../style/images/google.png'
import { useDispatch } from 'react-redux';
import { fetchSocialLogin } from '../../feature/userSlice';

const GoogleLoginBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  cursor: pointer;
  img {
    width: 25px;
    height: 25px;
  }
  `;

const clientId = `357973628595-ps5jq69d9mep96ap2pj82aqba61kal58.apps.googleusercontent.com`;

export default function GoogleButton(){

  const dispatch = useDispatch();

  const onSuccess = async (response) => {
    console.log(response.code)
    await dispatch(fetchSocialLogin(response))
  }

  const onFailure = (error) => {
    console.log(error);
  }

  return(
    <GoogleLoginBlock>
        <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <img 
              src={google}
              alt="google"
              onClick={renderProps.onClick}
              aria-hidden="true"
              />
            )}
            responseType={"code"}
            onSuccess={onSuccess}
            onFailure={onFailure}/>
    </GoogleLoginBlock>
  )
}