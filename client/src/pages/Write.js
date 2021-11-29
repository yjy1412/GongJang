import React from 'react';
import styled from 'styled-components';
import ImgUpload from '../components/write/ImgUpload';
import SelectCategory from '../components/write/SelectCategory';
import Button from '../components/common/Button';
import WhiteButton from '../components/common/WhiteButton';

const WriteBlock = styled.div`
  width: 1130px;
  margin: 3rem auto;
  form {
    input {
      width: 100%;
      font-size: 1.2rem;
      padding: 1rem;
      border-bottom: 2px solid  #575f95;
      &::placeholder {
        color: #bcbdc4;
      }
    }
    .info-title {
      display: inline-block;
      padding: 0.8rem;
      color: #fff;
      background: #575F95;
      border-radius: 20px 20px 0 0;
      p {
        font-size: 1.2rem;
      }
    }
    textarea {
      display: block;
      width: 100%;
      height: 450px;
      padding: 1rem;
      border: 2px solid #575F95;
      &::placeholder {
        font-size: 1.2rem;
        color: #bcbdc4;
      }
    }
    .btn-box {
      margin: 2rem 0;
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  }
`;

const WriteButton = styled(Button)`
  padding: 1rem;
`;

const Write = () => {
  return (
    <WriteBlock>
      <form>
        <input 
        type="text" 
        placeholder="나눔하고 싶은 아이템을 적어주세요."
        name="title"
        value=""
        />
        <ImgUpload/>
        <SelectCategory/>
          <div className="info-title">
            <p>ITEM INFO</p>
          </div>
          <textarea 
          placeholder="나눔 아이템에 대한 설명을 적어주세요."
          name="content"
          value=""
          />
        <div className="btn-box">
          <WhiteButton>CANCEL</WhiteButton>
          <WriteButton>PUBLISH</WriteButton>
        </div>
      </form>
    </WriteBlock>
  );
};

export default Write;