import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { fetchGetAllPosts } from '../../../feature/postsSlice';

const CategoryList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  .category-menu {
    cursor: pointer;
    padding: 2px 8px;
    &:hover {
      color: white;
      font-weight: 600;
      background: #ffdeb7;
      border-radius: 5px;
    }
  }
  @media only screen and (max-width: 768px){
    gap: 0;
  }
`;

const Categories = ({ categories }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const handleCategory = (category) => {
    history.push('/')
    setTimeout(() => {dispatch(fetchGetAllPosts({ category: category }));}, 500)
    
  }

  return (
    <CategoryList>
      {
        categories.map((category, idx) => 
          <li className="category-menu" key={idx} onClick={() => handleCategory(category, idx)} >{category}</li>
        )
      }
    </CategoryList>
  );
};

export default Categories;