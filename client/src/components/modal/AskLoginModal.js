import React from 'react';
import AskModal from './AskModal';

const AskLoginModal = ({ visible, onConfirm, onCancel }) => {
  return (
      <AskModal
      visible={visible}
      title='알림'
      description='로그인이 필요한 서비스입니다.'
      addDescription='로그인 하시겠습니까?'
      onConfirm={onConfirm}
      onCancel={onCancel}
      />
  );
};

export default AskLoginModal;