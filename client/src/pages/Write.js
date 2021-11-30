import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImgUpload from '../components/write/ImgUpload';
import SelectCategory from '../components/write/SelectCategory';
import Button from '../components/common/Button';
import WhiteButton from '../components/common/WhiteButton';
import { changeField, fetchWritePost } from '../feature/writeSlice';
import SalesStatus from '../components/write/SalesStatus';

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
    .select-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
    }
  }
  .btn-box {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

const WriteButton = styled(Button)`
  padding: 1rem;
`;

const Write = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  // const history = useHistory();
  // const dispatch = useDispatch();
  // const { post, postError, originalPostId, category, title, content, images, soldOut } = useSelector((state) => state.write);

  // const onChangeForm = (e) => {
  //   const { name, value } = e.target;
  //   dispatch(changeField({
  //     key: name,
  //     value,
  //   }))
  // }

  const onRemove = (index) => {
    const newImageURLs = imageURLs.filter((image, idx) => idx !== index);
    const newImageFiles = imageFiles.filter((image, idx) => idx !== index);
    setImageURLs(newImageURLs);
    setImageFiles(newImageFiles);
  }

  /*
  글 폼 전송하기
  const onSubmitForm = (e) => {
    e.preventDefault();

    if(originalPostId){
      const 
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('images', imageFiles);
    formData.append('category', category);
    formData.append('soldOut', soldOut);

    dispatch(fetchWritePost(formData));
  }

  useEffect(() => {
    const { post_id } = post;
    if(post){
      history.push(`/postDetail/${post_id}`);
    }
    if(postError){
      console.log(postError);
    }
    return () => { //언마운트될 때 초기화
       dispatch(initialize());
    }
  },[history, post, postError])
  */

  return (
    <WriteBlock>
      <form 
      // onSubmit={onSubmitForm}
      >
        <input 
        type="text" 
        placeholder="나눔하고 싶은 아이템을 적어주세요."
        name="title"
        value=""
        // onChange={onChangeForm}
        />
        <ImgUpload
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        imageURLs={imageURLs}
        setImageURLs={setImageURLs}
        onRemove={onRemove}
        />
        <div className="select-box">
          <SelectCategory />
          <SalesStatus/>
        </div>
        <div className="info-title">
          <p>ITEM INFO</p>
        </div>
        <textarea 
        placeholder="나눔 아이템에 대한 설명을 적어주세요."
        name="content"
        value=""
        // onChange={onChangeForm}
        />
      </form>
      <div className="btn-box">
          <WhiteButton>CANCEL</WhiteButton>
          <WriteButton>PUBLISH</WriteButton>
      </div>
    </WriteBlock>
  );
};

export default Write;