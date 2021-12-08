import React from 'react';
import styled from 'styled-components';
import WishItem from './WishItem';

const WishItemListBlock = styled.ul`
  display: flex;
  justify-content: flex-start;
  gap: 2.7rem;
  flex-wrap: wrap;
  padding: 2rem 0 4rem;
  `;

const Wish = ({wish, posts, user, setModal, modal}) => {

  const filteredWish = posts.filter((post) => post.wish === true);

  return (
    <>
      <WishItemListBlock>

            {
              filteredWish.map((post, idx) => 
                <WishItem 
                post={post}
                posts={posts}
                user={user}
                wish={wish}
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