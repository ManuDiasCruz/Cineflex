import styled from "styled-components"

export default function Footer({title, posterURL, date, hour}){
    return (
        <FooterCineflex>
            <div>
                <img src={posterURL} alt={title} />
            </div>
            <div>
                <h3>{title}</h3>
                {
                    hour !== "" ? 
                    <h3>{date} - {hour}</h3> 
                    :
                    ""
                }
            </div>
        </FooterCineflex>
    );
}

const FooterCineflex = styled.footer`
    width: 100vw;
    height: 100px;
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
