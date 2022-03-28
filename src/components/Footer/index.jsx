import styled from "styled-components";

import MovieBanner from "../CSSStyles/MovieBanner";
import Title2 from "../CSSStyles/Title2";

export default function Footer({title, posterURL, date, hour}){
    return (
        <FooterMain>
            <MovieBanner imagePath={posterURL} footer={true}>
                <img src={posterURL} alt={title} />
            </MovieBanner>
            <FooterContent>
                <h3>{title}</h3>
                <h3>{date} - {hour}</h3>
            </FooterContent>
        </FooterMain>
    );
}

const FooterMain = styled.footer `
    width: 100vw;
    height: 117px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    position: fixed;

    background: #DFE6ED;
    border: 1px solid #9EADBA;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
`;

const FooterContent = styled.div`
    width: 70vw;
    display: flex;
    flex-direction: column;
    align-items: left;
    
    h3{
        margin-bottom: 10px;
        font-size: 22px;
        text-align: left;
        color: #293845;
    }
`;

