import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const HiddenMenuBlock = styled.div`
  position: relative;
  width: 45px;
  height: 34px;
  cursor: pointer;
  transition: .3s ease-in-out;
  display: none;
  span {
    position: absolute;
    top: 0;
    width: 100%;
    height: 6px;
    border-radius: 4px;
    background: #575F95;
    transition: .2s;
    &:nth-child(2),
    &:nth-child(3) {
      top: 13px;
    }
    &:last-child {
      top: 26px;
    }
  }
  &.active {
    span {
      &:first-child,
      &:last-child {
        opacity: 0;
      }
      &:nth-child(2) {
        transform: rotate(45deg);
      }
      &:nth-child(3) {
        transform: rotate(-45deg);
      }
    }
  }
`;

const HiddenMenu = () => {
  const [changeSate, setChangeState] = useState(false);
  const menu = useRef(null);

  const onChangeShape = () => {
    if(!changeSate){
      setChangeState(true);
    } else {
      setChangeState(false);
    }
  }

  return (
    <HiddenMenuBlock 
    ref={menu} 
    onClick={onChangeShape}
    className={changeSate && 'active'}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </HiddenMenuBlock>
  );
};

export default HiddenMenu;