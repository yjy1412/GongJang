import React from 'react';
import AskModal from './AskModal';

const AskRemoveModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
    visible={visible}
    title='나눔 글 삭제'
    description='나눔 글을 정말 삭제하시겠습니까?'
    onConfirm={onConfirm}
    onCancel={onCancel}
    />
  );
};

export default AskRemoveModal;