import { useState, useEffect } from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


export default function Session(){

    const {movieId} = useParams(); //Used to match between the user selection and a object
    const [sessions, setSessions] = useState("");
    

    useEffect(() => {
        console.log("SESSION: ativando efeitos");
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`);
        promise.then(response => {
            const {data} = response;
            console.log("SESSION: terminei a requisição à API", data);
            setSessions(data);
        });
    }, []);

    return sessions.length > 0 ? (
        <SessionMain>
            <Title2>Renderizei a SESSION{console.log(movieId.tittle)}</Title2>
            {
                sessions.days.map( session => {
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
                                                <Button>{name}</Button>
                                            </Link>
                                        )
                                    })
                                }
                            </Hours>
                        </SessionInfo>
                    )
                })
            }
        </SessionMain>
        ):(
        <SessionMain>
            <Title2>Carregando lista de sessões...</Title2>
        </SessionMain>
        );
}

const SessionMain = styled.section`
    width: 100vw;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SessionInfo = styled.article`
    width: 100vw;
    height: 150px;
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

const MovieTitle = styled.h3`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 30px;
    display: flex;
    align-items: center;

    position: relative;

    color: #293845;
`;


