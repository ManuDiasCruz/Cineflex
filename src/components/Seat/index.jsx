import { useState, useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Backpage from "../CSSStyles/Backpage";
import Main from "../CSSStyles/Main";
import Title2 from "../CSSStyles/Title2";
import Button from "../CSSStyles/Button";
import Footer from "../Footer";


export default function Seat({getOrderData}){

    const {sessionId} = useParams(); //Used to match between the user selection and a object
    const [sessionSeats, setSessionSeats] = useState([]);
    const [availability, setAvailability] = useState(0);

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCPF] = useState("");

    const postURL = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";
    const navigate = useNavigate();
    console.log(`Renderizei SEATS com sessionId = ${sessionId}`);

    /** Load the sessions seats list 
        (it is used just the first time that the page is loaded). */
    useEffect(() => {
        console.log("SEATS: ativando efeitos");
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);
        promise.then(response => {
            const {data} = response;
            console.log("SEATS: terminei a requisição à API", data);
            setSessionSeats(data);
        });
    }, []);

    /** Make the user movie ticket order, in two steps:
        1. Execute a POST for the API Server with the required data;
        2. Call Success Page to show the order details.*/
    function reserveSeat(event){
        console.log("Reservando assentos...")
        event.preventDefault();
        const promise = axios.post(postURL, { //Send the data to the API Server
            ids: selectedSeats,
            name: name,
            cpf: cpf
        });

        promise.then(response => {
            console.log("Sucesso");
            navigate("/sucesso"); }); //Load the Success Page
        promise.catch(error => console.log("Algo deu errado meu chapa!"));
    }

    /** Main execution*/
    return sessionSeats.length !== 0 ? (
        <>
            <Backpage><ion-icon onClick={() => navigate(`/sessoes/${sessionSeats.movie.id}`)} name="chevron-back"></ion-icon></Backpage>
            <Main>
                <Title2>Selecione o(s) assento(s)</Title2>
                <SeatsMatrix>
                    {   
                        sessionSeats.seats.map( seat => {
                            const {id, name, isAvailable} = seat;
                            return (
                                isAvailable ?
                                
                                <SeatSpot availability={selectedSeats.includes(id)?2:0} 
                                    onClick={() => 
                                        selectedSeats.includes(id)?
                                        setSelectedSeats(() => {
                                            let seatsAux = selectedSeats;
                                            seatsAux.splice(selectedSeats.indexOf(id),1);
                                            return [...seatsAux];
                                        })
                                        :
                                        setSelectedSeats([...selectedSeats, id])
                                    }>    
                                    {id}
                                    {console.log("Os assentos selecionados são: "+selectedSeats)}
                                </SeatSpot>
                                :
                                <SeatSpot availability={1} 
                                    onClick={() => alert("Esse assento não está disponível")}>
                                    {id}
                                </SeatSpot>

                            )
                        })
                    }
                </SeatsMatrix>
                <Section>
                    <Article>
                        <SeatSpot availability={2}></SeatSpot>
                        <p>Selecionado</p>
                    </Article>
                    <Article>
                        <SeatSpot availability={0}></SeatSpot>
                        <p>Disponível</p>
                    </Article>
                    <Article>
                        <SeatSpot availability={1}></SeatSpot>
                        <p>Indisponível</p>
                    </Article>
                </Section>
                <form onSubmit={reserveSeat}>
                    <label>Nome do comprador:</label>
                    <input type="text" 
                        placeholder="Digite seu nome..." 
                        onChange={(event)=>setName(event.target.value)}
                        value={name}
                        required/>
                    {console.log(name)}
                    <label>CPF do comprador:</label>
                    <input type="text" 
                        placeholder="Digite seu CPF..."
                        minLength={11}
                        maxLength={11}
                        onChange={(event)=>setCPF(event.target.value)}
                        value={cpf}
                        required/>
                    {console.log(cpf)}
                    <Button width={"100%"} type="submit" 
                            onClick={() => {
                                const order = {
                                    title: sessionSeats.movie.title, 
                                    date: sessionSeats.day.date, 
                                    time: sessionSeats.name, 
                                    imagePath: sessionSeats.movie.posterURL, 
                                    seats: selectedSeats, 
                                    buyer: name, 
                                    buyerId: cpf,
                                    sessionId: sessionId};
                                getOrderData(order);
                                }
                                }>
                        Reservar assento(s)
                    </Button>
                </form>
                <Footer title={sessionSeats.movie.title} posterURL={sessionSeats.movie.posterURL} date={sessionSeats.day.date} hour={sessionSeats.name}></Footer>
            </Main>
        </>
    ):(
        <>
            <Backpage><ion-icon onClick={() => navigate(`/sessoes/${sessionSeats.movie.id}`)} name="chevron-back"></ion-icon></Backpage>
            <Main>
                <Title2>Carregando assentos...</Title2>
            </Main>
        </>
    );
}

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

    font-size: 10px;
    line-height: 13px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.005em;

    color: #000000;
`;

const Section = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center; 

    font-size: 13px;
    line-height: 15px;
    display: flex;
    align-items: center;
    letter-spacing: -0.013em;

    color: #4E5A65;
`;

const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 15px;
`;