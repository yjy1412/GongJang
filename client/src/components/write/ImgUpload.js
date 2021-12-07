import React from 'react';
import styled from 'styled-components';
import { RiImageAddLine } from 'react-icons/ri';
import { FaTimes } from 'react-icons/fa';

const ImgUploadBlock = styled.div`
  margin: 1.5rem 0 0;
  p {
    color: #bcbdc4;
  }
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
      height: 100%;
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

const ImgUpload = ({ 
  images, 
  uploadImages, 
  setUploadImages, 
  imageURLs , 
  setImageURLs, 
  onRemove,
  onRemoveImage 
}) => {
  //이미지 미리보기
  const onFileChange = (e) => {
    let files = e.target.files;
    if(files.length < 1 ){
      return;
    }
    setUploadImages([
      ...uploadImages,
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

  const data = images.map(el => {
    const ss = btoa(String.fromCharCode(...new Uint8Array(el)));
    return `data:image/png;base64,${ss}`;
  })

  //글 수정시 서버에서 불러온 이미지도 보여주고, 해당 이미지 삭제리듀서 작성

  return (
    <ImgUploadBlock>
      <ImgPreviewBox>
        { data && (
          data.map((image, index) => (
            <div className="img-box" key={index}>
              <img 
              src={image} 
              alt=""
              style={{ backgroundImage : image }} 
              />
              <div className="remove-btn" onClick={() => onRemoveImage(index)}>
                <FaTimes/>
              </div>
            </div>
          ))
        )}
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
        { data.length + imageURLs.length < 3 && (
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
      <p>(최대 3장 이미지 첨부 가능)</p>
    </ImgUploadBlock>
  );
};

export default ImgUpload;