import styled from "styled-components";

const Title2 = styled.nav`
    width: 100vw;
    height: 60px;
    margin-top: 120px;
    margin-bottom: 0px;
    font-size: 24px;
    font-style: ${props => props.detail !== "bold" ? "normal" : "bold"};
    font-weight: ${props => props.detail !== "bold" ? 400 : 700};
    color: ${props => props.detail !== "bold" ? "#000000" : "#247A6B"};
    
    p{
        margin-bottom: 5px;
    }
`;

export default Title2;