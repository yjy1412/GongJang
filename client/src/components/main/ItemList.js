import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const ItemListBlock = styled.ul`
  display: flex;
  justify-content: flex-start;
  gap: 2.7rem;
  flex-wrap: wrap;
  padding: 2rem 0 4rem;
  @media only screen and (max-width: 1024px){
    gap: 2.8rem;
  }
  @media only screen and (max-width: 768px){
    width: 100%;
    gap: 2.5rem;
  }
`;

const ItemList = ({ posts, user, modal, setModal }) => {
  
  return (
    <ItemListBlock>
      { posts.map((post) => (
        <Item 
        key={post?.id} 
        post={post} 
        user={user}
        modal={modal}
        setModal={setModal}
        />
      ))}
    </ItemListBlock>
  );
};

export default ItemList;