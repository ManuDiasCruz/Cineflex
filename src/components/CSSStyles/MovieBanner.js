import styled from "styled-components";

const MovieBanner = styled.article`
    width: ${props => props.footer === undefined ? 145 : 64}px;
    height: ${props => props.footer === undefined ? 210: 89}px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px;

    img{
        width: ${props => props.footer === undefined ? 130 : 52}px;
        height: ${props => props.footer === undefined ? 195 : 77}px;
        background: url(${props => props.imagePath});
    }
`;

export default MovieBanner;