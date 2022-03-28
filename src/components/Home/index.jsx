import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Title2 from "../CSSStyles/Title2";
import Main from "../CSSStyles/Main";
import MovieBanner from "../CSSStyles/MovieBanner";

export default function Home(){

    const [movies, setMovies] = useState([]);
    console.log("Renderizei MENU");

    useEffect( () => {
        console.log("MENU: ativando efeitos");
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then((response) => {
            const {data} = response;
            console.log("MENU: terminei a requisição à API", data);
            setMovies(data);
        });
        promise.catch(error => console.log(`MENU: ${error.response}`));
    }, []);

    return movies.length>0 ? (
        <Main fullscreen={true}>
            <Title2>Selecione o filme</Title2>
            <MoviesList>
                {
                    movies.map( movie => {
                        const {id, title, posterURL, overview, releaseDate} = movie;
                        return (
                            <MovieBanner imagePath={posterURL}>
                                <Link to={`/sessoes/${id}`}>
                                    <img src={posterURL} alt={title} />
                                </Link>
                            </MovieBanner>
                        )
                    })
                }
            </MoviesList>
        </Main>
        ):(
        <Main>
            <span>Carregando lista de filmes...</span>
        </Main>
        );
}

const MoviesList = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;