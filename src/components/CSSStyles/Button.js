import styled from "styled-components";

const Button = styled.button`
    width:${props => props.width};
    height: 43px;
    margin-right: 10px;
    
    background: #E8833A;
    border-radius: 3px;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
`;

export default Button;