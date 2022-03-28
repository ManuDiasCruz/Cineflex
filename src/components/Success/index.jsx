import styled from "styled-components";
import {useNavigate} from "react-router-dom";

import Backpage from "../CSSStyles/Backpage";
import Title2 from "../CSSStyles/Title2";
import Main from "../CSSStyles/Main";
import Button from "../CSSStyles/Button";

export default function Success({orderData}){
    const {title, date, time, imagePath, seats, buyer, buyerId, sessionId} = orderData;
    const navigate = useNavigate();
    return (
        <>
            <Backpage><ion-icon onClick={() => navigate(`/assentos/${sessionId}`)} name="chevron-back"></ion-icon></Backpage>
            <Main>
                <Title2 detail="bold"> 
                    <p>Pedido feito</p>  
                    <p>com sucesso!</p>
                </Title2>
                <Section>
                    <Article>
                        <h3>Filme e sessão</h3>
                        <p>{title}</p>
                        <p>{date} {time}</p>
                    </Article>
                    <Article>
                        <h3>Ingressos</h3>
                        {console.log(seats)}
                        {seats.map(seat => {return <p>Assento {seat}</p>})}
                    </Article>
                    <Article>
                        <h3>Comprador</h3>
                        <p>Nome: {buyer}</p>
                        <p>CPF: {buyerId}</p>
                    </Article>
                </Section>
                <Button width={"225px"} onClick={()=>navigate("/")}>Voltar para Home</Button>
            </Main>
        </>
    );
}


const Section = styled.section`
    width: 400px;
    display: flex;
    flex-direction: column;

    left: 0px;
    margin-top: 28px;
    margin-bottom: 62px;

    letter-spacing: 0.04em;
    color: #293845;
    text-align: left;
`;

const Article = styled.article`
    margin-bottom: 20px;
    margin-left: 28px;
    display: flex;
    flex-direction: column;

    h3{
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px; 
    }

    p{
        font-size: 22px;
        line-height: 26px;
    }
`;