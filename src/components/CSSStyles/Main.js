import styled from "styled-components";

const Main=styled.main`
    width: 100vw;
    margin-top: 0px;
    margin-bottom: ${props => props.fullscreen ? "0px" : "116px"};
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default Main;