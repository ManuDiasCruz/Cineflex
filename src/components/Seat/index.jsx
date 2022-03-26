import { useState, useEffect } from "react";
import {useParams, Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function Seat(){

    const {sessionId} = useParams(); //Used to match between the user selection and a object
    const [seats, setSeats] = useState([""]);
    const [availability, setAvailability] = useState(0);

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCPF] = useState("");

    const postURL = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";
    const navigate = useNavigate();
    console.log(`Renderizei SEATS com sessionId = ${sessionId}`);

    useEffect(() => {
        console.log("SEATS: ativando efeitos");
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);
        promise.then(response => {
            const {data} = response;
            console.log("SEATS: terminei a requisição à API", data);
            setSeats(data.seats);
        });
    }, []);

    console.log(seats);

    

    function reserveSeat(event){
        event.preserveDefault();
        const promise = axios.post(postURL, {
            ids: selectedSeats,
            name: name,
            cpf: cpf
        });
        promise.then(response =>
            navigate("/sucesso"));
        promise.catch(error => console.log("Algo deu errado meu chapa!"));
    }

    return seats.length > 0 ? (
        <Container>
            <Title2>Selecione o(s) assento(s)</Title2>
            <SeatsMatrix>
                {   
                    seats.map( seat => {
                        const {id, name, isAvailable} = seat;
                        return (
                            <SeatSpot availability={isAvailable?0:1} 
                                onClick={() => {
                                    if (isAvailable){
                                        setSelectedSeats([...selectedSeats, id]);
                                        isAvailable = 2;
                                    }else{
                                        alert("Esse assento não está disponível");
                                    }
                                }}>    
                                {id}
                                {console.log("Os assentos selecionados são: "+selectedSeats)}
                            </SeatSpot>
                        )
                    })
                }
            </SeatsMatrix>
            <Subtitle>
                <SubItem>
                    <SeatSpot availability={2}></SeatSpot>
                    <p>Selecionado</p>
                </SubItem>
                <SubItem>
                    <SeatSpot availability={0}></SeatSpot>
                    <p>Disponível</p>
                </SubItem>
                <SubItem>
                    <SeatSpot availability={1}></SeatSpot>
                    <p>Indisponível</p>
                </SubItem>
            </Subtitle>
            <form onSubmit={reserveSeat}>
                <SubItem>
                    <p>Nome do comprador:</p>
                    <input type="text" 
                        placeholder="Digite seu nome..." 
                        onChange={(event)=>setName(event.target.value)}
                        value={name}
                        required/>
                    {console.log(name)}
                </SubItem>
                <SubItem>
                    <p>CPF do comprador:</p>
                    <input type="text" 
                        placeholder="Digite seu CPF..."
                        onChange={(event)=>setCPF(event.target.value)}
                        value={cpf}
                        required/>
                    {console.log(cpf)}
                </SubItem>
                <Button type="submit">Reservar assento(s)</Button>
            </form>
        </Container>
    ):(
    <Container>
        <Title2>Carregando assentos...</Title2>
    </Container>
    );
}

const Container = styled.main`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title2 = styled.h2`
    width: 100vw;
    height: 100px;
    margin-top: 120px;
    margin-bottom: 0px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 60px;
    text-align: center;
    letter-spacing: 0.04em;

    color: #293845;
`;

const SeatsMatrix = styled.section`
    max-width: 400px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const SeatSpot = styled.article`
    width: 26px;
    height: 26px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    margin: 6px;

    background: ${props => props.availability == 0 ? "#C3CFD9" : props.availability == 1 ? "#F7C52B" : "#8DD7CF"};
    border: 1px solid ${props => props.availability == 0 ? "#808F9D" : props.availability == 1 ? "F7C52B" : "#1AAE9E"};
    box-sizing: border-box;
    border-radius: 12px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;

    color: #000000;
`;

const Subtitle = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center; 

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    display: flex;
    align-items: center;
    letter-spacing: -0.013em;

    color: #4E5A65;
`;

const SubItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    margin: 27px;
`;

const Button = styled.button`
    background: #E8833A;
    border-radius: 3px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;

    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.02em;
    margin-left: 24px;

    color: #FFFFFF;
`;

const Footer = styled.footer`
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