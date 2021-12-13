import React from 'react';
import styled from 'styled-components';

const FooterBlock = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .about {
    font-size: 1.6rem;
    font-weight: 600;
  }
  .contributers {
    display: flex;
    padding: 1.7rem 0;
    li {
      text-align: center;
      padding: 0.5rem;
      margin-right: 0.5rem;
      p {
        color: #b2b0b0;
        margin: 0.3rem 0;
      }
    }
  }
  @media only screen and (max-width: 768px){
    flex-direction: column;   
    gap: 0;
  }
`;

const Footer = () => {
  return (
    <FooterBlock>
      <div className="about">
        <p>About Us</p>
      </div>
      <ul className="contributers">
        <li>
          <h4>정지우</h4>
          <p>Frontend</p>
          <a href="https://github.com/djdu4496">GitHub</a>
        </li>
        <li>
          <h4>김주희</h4>
          <p>Frontend</p>
          <a href="https://github.com/treatme030">GitHub</a>
        </li>
        <li>
          <h4>양진영</h4>
          <p>Backend</p>
          <a href="https://github.com/yjy1412">GitHub</a>
        </li>
        <li>
          <h4>한수현</h4>
          <p>Backend</p>
          <a href="https://github.com/Gwangandong">GitHub</a>
        </li>
      </ul>
    </FooterBlock>
  );
};

export default Footer;