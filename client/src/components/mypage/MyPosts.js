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