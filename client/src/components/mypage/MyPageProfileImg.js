import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchUpdateProfileImage } from '../../feature/userSlice';
import AskEditModal from '../modal/AskEditModal';

const MyPageProfileImgBlock = styled.div`

display: flex;
  flex-direction: column;

  img {
    width: 200px;
    height: 200px;
    border-radius: 100px;
  }

  label {
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    cursor: pointer;
  }
`

const MyPageProfileImg = ({previewProfileImage, setPreviewProfileImage}) => {

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const onFileChange = (e) => {
    let files = e.target.files;
    if(files.length < 1 ){
      return;
    }
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setPreviewProfileImage(result);
      console.log(previewProfileImage);
    }
    if(files[0]){
      reader.readAsDataURL(files[0]);
    }
  }
  
  useEffect(() => {
    if(previewProfileImage){
        setVisible(true);
    }
  }, [previewProfileImage])

  const onCancel = () => {
    setVisible(false);
  }

  const onConfirm = () => {
    setVisible(false);
    console.log(previewProfileImage);
    dispatch(fetchUpdateProfileImage(previewProfileImage));
  }

  return (
    <>
      <MyPageProfileImgBlock>
        <div className="img-box">
          <img 
            src={
              previewProfileImage ?
              previewProfileImage :
              'https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200008/91087328-%EC%97%AC%EC%84%B1%EC%9A%A9-%EA%B8%B0%EB%B3%B8-%EC%95%84%EB%B0%94%ED%83%80-%ED%94%84%EB%A1%9C%ED%95%84-%EC%95%84%EC%9D%B4%EC%BD%98-%ED%9A%8C%EC%83%89-%EC%82%AC%EC%A7%84-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C-%EC%9E%90-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%B2%A1%ED%84%B0.jpg?ver=6'
            } 
            alt="profile"
            style={{ backgroundImage : previewProfileImage }}  
          />
        </div>  
        <div className="input-box">
          <label htmlFor="file">
            사진 업데이트하기
          </label>
          <input 
            type="file"
            accept="image/*"
            id="file"
            name="file"
            style={{ display: 'none' }}
            onChange={onFileChange}
          />
        </div>
      </MyPageProfileImgBlock>
      { 
        visible && (
        <AskEditModal visible={visible} onConfirm={onConfirm} onCancel={onCancel}
        />
      )}
    </>
  );
};

export default MyPageProfileImg;