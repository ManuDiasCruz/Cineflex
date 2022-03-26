import {BrowserRouter, Routes, Route} from "react-router-dom";
import styled from "styled-components";

import NavHeader from "./NavHeader";
import Menu from "./Menu";
import Session from "./Session";
import Seat from "./Seat"
import Success from "./Success";

import "./../assets/css/reset.css"

export default function App(){
    return(
        <BrowserRouter>
            <NavHeader></NavHeader>
            <Routes>
                <Route path="/" element={<Menu />}></Route>
                <Route path="/sessoes/:movieId" element={<Session/>}></Route>
                <Route path="/assentos/:sessionId" element={<Seat />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
/*
        <BrowserRouter>
            <NavHeader></NavHeader>
            <Routes>
                <Route path="/" element={<Menu />}></Route>
                <Route path="/sessoes/:idFilme" element={<Movie />}></Route>
                <Route path="/assentos/:idSessao" element={<Session />}></Route>
                <Route path="/sucesso" element={<Success />}></Route>
            </Routes>
        </BrowserRouter>
*/
