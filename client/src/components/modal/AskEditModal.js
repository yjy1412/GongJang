import React from 'react';
import AskModal from './AskModal';

const AskEditModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
    visible={visible}
    title='회원 정보 변경'
    description='입력하신 내용으로 변경하시겠습니까?'
    onConfirm={onConfirm}
    onCancel={onCancel}
    />
  );
};

export default AskEditModal;