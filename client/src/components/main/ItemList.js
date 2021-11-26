import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const ItemListBlock = styled.ul`
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 6rem;
  flex-wrap: wrap;
  padding: 2rem 0 4rem;
`;

const ItemList = () => {
  return (
    <ItemListBlock>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
    </ItemListBlock>
  );
};

export default ItemList;