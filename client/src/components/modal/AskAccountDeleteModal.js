import React from 'react';
import AskModal from './AskModal';

const AskAccountDeleteModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
    visible={visible}
    title='회원 계정 탈퇴'
    description='더이상 공.장을 이용하지 않으시겠습니까?'
    onConfirm={onConfirm}
    onCancel={onCancel}
    />
  );
};

export default AskAccountDeleteModal;