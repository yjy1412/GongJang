import React from 'react';
import styled from 'styled-components';
import Item from '../main/Item';

const WishItemListBlock = styled.ul`
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

const Wish = ({posts, user, setModal, modal}) => {

  const filteredWish = posts.filter((post) => post.wish === true);

  return (
    <>
      <WishItemListBlock>
        {
          filteredWish.map((post) => 
            <Item
            post={post}
            user={user}
            key={post?.id}
            modal={modal}
            setModal={setModal}
            />
          )
        }
      </WishItemListBlock>
    </>
  );
};

export default Wish;