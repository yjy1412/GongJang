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
  }
  select {
    color: inherit;
    padding: 0.3rem 0;
    outline: none;
  }
`;

const SelectCategory = () => {
  const dispatch = useDispatch();  
  const categories = ['보드게임', '퍼즐', '레고'];

  const onChangeSelect = (e) => {
    const categorySelect = document.querySelector('#category-select');
    let selectValue = categorySelect.options[categorySelect.selectedIndex].value;
    dispatch(changeCategory(selectValue));
  }

  return (
    <SelectCategoryBlock>
      <label htmlFor="category-select">연관 카테고리를 선택하세요.</label>
      <select 
      name="categories" 
      id="category-select"
      defaultValue="categories"
      onChange={onChangeSelect}
      >
        <option value='--카테고리를 선택하세요.--' selected>--카테고리를 선택하세요.--</option>
        { categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    </SelectCategoryBlock>
  );
};

export default SelectCategory;