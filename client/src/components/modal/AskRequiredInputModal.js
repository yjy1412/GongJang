import React from 'react';
import AskModal from './AskModal';

const AskRequiredInputModal = ({ visible, onConfirm }) => {
  return (
    <AskModal
      visible={visible}
      title='알림'
      description='필수 입력란을 작성해주세요.'
      onConfirm={onConfirm}
      type='required'
      />
  );
};

export default AskRequiredInputModal;