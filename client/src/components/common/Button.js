import React from 'react';
import styled from 'styled-components';
const ButtonStyle = styled.button`
    border-radius: 5px;
    padding: 0.25rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background: #575F95;
    border: 1px solid #575F95;
    transition: .3s;
    cursor: pointer;
    &:hover {
        background: #fff;
        color: #575F95;
        border: 1px solid #575F95
    }
`;

const Button = (props) => {
    return (
        <ButtonStyle {...props} />
    );
};

export default Button;