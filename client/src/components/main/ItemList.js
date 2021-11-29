import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const ItemListBlock = styled.ul`
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  gap: 2.7rem;
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