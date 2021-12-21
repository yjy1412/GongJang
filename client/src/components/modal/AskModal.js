import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import WhiteButton from '../common/WhiteButton';

const ModalBackground = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
`;

const ModalBox = styled.div`
  width: 360px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  background: #fff;
  border-radius: 2px;
  padding: 2rem; 
  text-align: center;
  h2 {
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #575F95;
  }
  .ask-login {
    margin-bottom: 3rem;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

const ModalTemplate = ({
  visible,
  title,
  description,
  addDescription,
  confirmText = 'CONFIRM',
  cancelText = 'CANCEL',
  onConfirm,
  onCancel,
  type
}) => {
  if(!visible){
    return null;
  }
  return (
    <ModalBackground>
      <ModalBox>
        <h2>{title}</h2>
        <p>{description}</p>
        <p className="ask-login">{addDescription}</p>
        <div className="btn-box">
          { type !== 'required' && <WhiteButton onClick={onCancel}>{cancelText}</WhiteButton>}
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </ModalBox>
    </ModalBackground>
  );
};

export default ModalTemplate;