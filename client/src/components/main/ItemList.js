import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const ItemListBlock = styled.ul`
  display: flex;
  justify-content: flex-start;
  gap: 2.7rem;
  flex-wrap: wrap;
  padding: 2rem 0 4rem;
`;

const ItemList = ({ posts }) => {
  
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