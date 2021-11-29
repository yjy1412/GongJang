import React from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';

const SearchBlock = styled.div`
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #dadcec;
  transform: translateY(-120%);
  transition: transform .3s; */
  .wrap {
    position: relative;
    width:70%;
    margin: 0 auto;
    padding: 2rem 0;
    .search-container {
      width: 50%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .search-box {
        width: 100%;
        padding: 0.5rem 0;
        display: flex;
        align-items: center;
        input {
          width: 100%;
          font-size: 1.3rem;
          border-bottom: 1px solid #575F95;
          padding-bottom: 0.2rem;
          &::placeholder {
            color: #b2b0b0;
          }
        }
        .search-icon {
          font-size: 1.5rem;
          padding: 0.5rem;
          cursor: pointer;
        }
      }
      .category-box {
        width: 100%;
        .category-list {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 3rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          span {
            font-weight: 600;
            margin-right: 1rem;
          }
        }
      }
    }
    .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      padding: 2rem;
      font-size: 1.2rem;
    }
  }
`;

const Search = ({ onClick }) => {
  return (
    <SearchBlock>
      <div className="wrap">
        <div className="search-container">
          <div className="search-box">
            <input 
            type="text"
            placeholder="나눔 아이템을 검색하세요." 
            name=""
            value=""
            />
            <div className="search-icon" >
              <FiSearch/>
            </div>
          </div>
          <div className="category-box">
            <ul className="category-list">
              <li><span>카테고리</span></li>
              <li>보드게임</li>
              <li>퍼즐</li>
              <li>레고</li>
            </ul>
          </div>
        </div>
        <div className="close-icon" onClick={onClick}>
          <FaTimes/>
        </div>
      </div>
    </SearchBlock>
  );
};

export default Search;