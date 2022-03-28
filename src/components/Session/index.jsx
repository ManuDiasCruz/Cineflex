import { useState, useEffect } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Backpage from "../CSSStyles/Backpage";
import Main from "../CSSStyles/Main"
import Title2 from "../CSSStyles/Title2";
import Button from "../CSSStyles/Button";
import Footer from "../Footer";


export default function Session(){

    const {movieId} = useParams(); //Used to match between the user selection and a object
    const [sessions, setSessions] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("SESSION: ativando efeitos");
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`);
        promise.then(response => {
            const {data} = response;
            console.log("SESSION: terminei a requisição à API", data);
            setSessions(data);
        });
    }, []);
    console.log(sessions.length);
    return sessions !== 0 ? (
        <>
            <Backpage><ion-icon onClick={() => navigate("/")} name="chevron-back"></ion-icon></Backpage>
            <Main>
                <Title2>Selecione o horário</Title2>
                {
                    sessions.days.map( session => {
                        console.log(session);
                        const {id, weekday, date, showtimes} = session;
                        return (
                            <SessionInfo>
                                <Date> {weekday} - {date} </Date>
                                <Hours>
                                    {
                                        showtimes.map( showtime => {
                                            const {name, id} = showtime;
                                            return (
                                                <Link to={`/assentos/${id}`}>
                                                    <Button width={"82px"}>{name}</Button>
                                                </Link>
                                            )
                                        })
                                    }
                                </Hours>
                            </SessionInfo>
                        )
                    })
                }
                <Footer title={sessions.title} posterURL={sessions.posterURL} date={""} hour={""}></Footer>
            </Main>
        </>
        ):(
        <>
            <Backpage><ion-icon onClick={() => navigate("/")} name="chevron-back"></ion-icon></Backpage>
            <Main>
                <Title2>Carregando lista de sessões...</Title2>
            </Main>
        </>
        );
}

const SessionInfo = styled.article`
    width: 400px;
    height: 88px;
`;

const Date = styled.h3`
    height: 35px;
    margin-left: 24px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: left;
    letter-spacing: 0.02em;

    color: #293845;
`;

const Hours = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 24px;
`;


