import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function Menu(){

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
        <MenuMain>
            <Title2>Selecione o filme</Title2>
            <MoviesList>
                {
                    movies.map( movie => {
                        const {id, title, posterURL, overview, releaseDate} = movie;
                        return (
                            <Movie imagePath={posterURL}>
                                <Link to={`/sessoes/${id}`}>
                                    <img src={posterURL} alt={title} />
                                </Link>
                            </Movie>
                        )
                    })
                }
            </MoviesList>
        </MenuMain>
        ):(
        <MenuMain>
            <Title2>Carregando lista de filmes...</Title2>
        </MenuMain>
        );
}

const MenuMain = styled.main`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MoviesList = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const Movie = styled.article`
    width: 145px;
    height: 210px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px;

    img{
        width: 130px;
        height: 195px;
        background: url(${props => props.imagePath});
    }
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