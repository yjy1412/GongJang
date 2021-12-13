import React from 'react';
import styled from 'styled-components';
import MyPost from './MyPost';

const MyPostsBlock = styled.div`
  width: 1130px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  gap: 2.7rem;
  flex-wrap: wrap;
  padding: 2rem 0 4rem;
  @media only screen and (max-width: 1024px){
    width: 100%;
    margin: 0;
    padding: 2rem 0;
    gap: 2.8rem;
  }
  @media only screen and (max-width: 768px){
    padding: 2rem 0;
    width: 100%;
    gap: 2.5rem;
  }
`;

const MyPosts = ({ posts, user }) => {

  const filteredMyPosts = posts.filter((post) => post.writer.writer_email ===  user.email )

  return (
    <MyPostsBlock>
      {
        filteredMyPosts.map((post, idx) => 
          <MyPost 
          post={post}
          user={user}
          key={post?.id}
          />
        )
      }
    </MyPostsBlock>
  );
};

export default MyPosts;