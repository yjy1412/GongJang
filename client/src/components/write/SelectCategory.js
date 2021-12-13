import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeCategory } from '../../feature/writeSlice';

const SelectCategoryBlock = styled.div`
  display: flex;
  align-items: center;
  margin: 3rem 0;
  label {
    font-size: 1.2rem;
    margin-right: 0.5rem;
    span {
      color: #bcbdc4;
    }
  }
  select {
    color: inherit;
    padding: 0.3rem 0;
    outline: none;
  }
`;

const categories = ['--카테고리를 선택하세요.--', '장난감', '인형', '보드게임', '퍼즐', '프라모델', '기타'];
const SelectCategory = ({ category }) => {
  const dispatch = useDispatch();

  const onChangeSelect = (e) => {
    dispatch(changeCategory(e.target.value));
  }

  return (
    <SelectCategoryBlock>
      <label htmlFor="category-select">연관 카테고리를 선택하세요.
        <span>(필수)</span>
      </label>
      <select 
      name="categories" 
      id="category-select"
      value={category}
      onChange={onChangeSelect}
      >
        { categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    </SelectCategoryBlock>
  );
};

export default SelectCategory;