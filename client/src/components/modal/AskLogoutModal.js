import React from 'react';
import AskModal from './AskModal';

const AskLogoutModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
    visible={visible}
    title='알림'
    description='로그 아웃 하시겠습니까?'
    onConfirm={onConfirm}
    onCancel={onCancel}
    />
  );
};

export default AskLogoutModal;