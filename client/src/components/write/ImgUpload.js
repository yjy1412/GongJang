import React, { useState } from 'react';
import styled from 'styled-components';
import { RiImageAddLine } from 'react-icons/ri';
import { FaTimes } from 'react-icons/fa';

const ImgUploadBlock = styled.div`
  margin: 1.5rem 0;
`;

const ImgPreviewBox = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  .img-box {
    position: relative;
    max-width: 200px;
    width: 100%;
    height: 100%;
    box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5),
    2px 2px 5px rgba(94, 104, 121, 0.3);
    background: orchid;
    img {
      width: 100%;
    }
    .remove-btn {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1rem;
      cursor: pointer;
    }
  }
  .input-box {
    position: relative;
    max-width: 200px;
    width: 100%;
    background: salmon;
    .img-plus {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 3rem;
      cursor: pointer;
    }
  }
`;

const ImgUpload = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  //이미지 미리보기
  const onFileChange = (e) => {
    const files = e.target.files;
    if(files.length < 1 ){
      return;
    }
    setImageFiles([
      ...imageFiles,
      ...files]);

    for(let file of files){
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const { result } = finishedEvent.currentTarget;
        setImageURLs([
          ...imageURLs,
          result
        ]);
      }
      if(file){
        reader.readAsDataURL(file);
      }
    }
  }
  
  const onRemove = (index) => {
    const newURLs = imageURLs.filter((image, idx) => idx !== index);
    setImageURLs(newURLs);
  }

  return (
    <ImgUploadBlock>
      <ImgPreviewBox>
        { imageURLs && (
          imageURLs.map((imageURL, index) => (
            <div className="img-box" key={index}>
              <img 
              src={imageURL} 
              alt=""
              style={{ backgroundImage : imageURL }} 
              />
              <div className="remove-btn" onClick={() => onRemove(index)}>
                <FaTimes/>
              </div>
            </div>
          ))
        )}
        { imageURLs.length < 3 && (
          <div className="input-box">
            <label htmlFor="file">
              <div className="img-plus">
              <RiImageAddLine/>
              </div>
            </label>
            <input 
            type="file"
            accept="image/*" 
            multiple
            id="file"
            style={{ display: 'none' }}
            onChange={onFileChange}
            />
          </div>
        )}
      </ImgPreviewBox>
    </ImgUploadBlock>
  );
};

export default ImgUpload;