import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImgUpload from '../components/write/ImgUpload';
import SelectCategory from '../components/write/SelectCategory';
import Button from '../components/common/Button';
import WhiteButton from '../components/common/WhiteButton';
import { changeField, fetchUpdatePost, fetchWritePost, initialize, removeImage } from '../feature/writeSlice';
import SalesStatus from '../components/write/SalesStatus';
import AskModal from '../components/modal/AskModal';

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
      font-size: 1.2rem;
      border: 2px solid #575F95;
      &::placeholder {
        font-size: inherit;
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
  const [uploadImages, setUploadImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [modal, setModal] = useState(false);
  
  const history = useHistory();
  const dispatch = useDispatch();
  const { 
    post, 
    postError, 
    originalPostId, 
    category, 
    title, 
    content, 
    soldOut,
    images,
  } = useSelector((state) => state.write);

  const onConfirm = () => {
    setModal(!modal);
  }

  const onCancel = () => {
    history.push('/');
  }

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({
      key: name,
      value,
    }))
  }

  const onRemove = (index) => {
    const newImageURLs = imageURLs.filter((url, idx) => idx !== index);
    const newImages = uploadImages.filter((image, idx) => idx !== index);
    setImageURLs(newImageURLs);
    setUploadImages(newImages);
  }

  const onRemoveImage = (index) => {
    dispatch(removeImage(index));
  }
  
  //글 폼 전송하기
  const onSubmitForm = (e) => {
    e.preventDefault();

    if([title, content, category].includes('')){
      onConfirm();
    }

    //formData 전송
    //이미지 변경시 파일로 첨부된 변경 이미지만 보내는게 좋을 듯
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('soldOut', soldOut);
    images.forEach((file) => {
      formData.append('image', file);
    })
    uploadImages.forEach((file) => {
      formData.append('image', file);
    });
    
    //글 수정 후 업데이트
    if(originalPostId){
      dispatch(fetchUpdatePost({formData, id: originalPostId}));
      return;
    } 
    dispatch(fetchWritePost(formData));
  }

  useEffect(() => {
    if(post){
      const { post_id } = post;
      history.push(`/${post_id}`);
    }
    if(postError){
      console.log(postError);
    }
    return () => { //언마운트될 때 초기화
       dispatch(initialize());
    }
  },[dispatch, history, post, postError])
  
  return (
    <WriteBlock>
      <form>
        <input 
        type="text" 
        placeholder="나눔하고 싶은 아이템을 적어주세요.(필수)"
        name="title"
        value={title}
        onChange={onChangeForm}
        />
        <ImgUpload
        images={images}
        uploadImages={uploadImages}
        setUploadImages={setUploadImages}
        imageURLs={imageURLs}
        setImageURLs={setImageURLs}
        onRemove={onRemove}
        onRemoveImage={onRemoveImage}
        />
        <div className="select-box">
          <SelectCategory category={category}/>
          <SalesStatus soldOut={soldOut}/>
        </div>
        <div className="info-title">
          <p>ITEM INFO</p>
        </div>
        <textarea 
        placeholder="나눔 아이템에 대한 설명을 적어주세요.(필수)"
        name="content"
        value={content}
        onChange={onChangeForm}
        />
      </form>
      <div className="btn-box">
          <WhiteButton onClick={onCancel}>CANCEL</WhiteButton>
          <WriteButton 
          onClick={onSubmitForm}
          >PUBLISH</WriteButton>
      </div>
      { modal && (
      <AskModal 
      visible={modal} 
      title='알림'
      description='필수 입력란을 작성해주세요.'
      onConfirm={onConfirm}
      type='required'
      />
      )}
    </WriteBlock>
  );
};

export default Write;