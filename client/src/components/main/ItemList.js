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

const ItemList = ({ posts, user, wishError }) => {
  
  return (
    <ItemListBlock>
      { posts.map((post) => (
        <Item 
        key={post.id} 
        post={post} 
        user={user}
        wishError={wishError}
        />
      ))}
    </ItemListBlock>
  );
};

export default ItemList;