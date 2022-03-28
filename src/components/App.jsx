import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import styled from "styled-components";

import NavHeader from "./NavHeader";
import Footer from "./Footer";
import Home from "./Home";
import Session from "./Session";
import Seat from "./Seat"
import Success from "./Success";

import "./../assets/css/reset.css";
import GlobalStyle from "./CSSStyles/GlobalStyle";

export default function App(){

    const [orderData, setOrderData] = useState("");

    return(
        <BrowserRouter>
            <GlobalStyle color={"#293845"}/>
            <NavHeader/>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/sessoes/:movieId" element={<Session/>}></Route>
                <Route path="/assentos/:sessionId" element={
                    <Seat getOrderData={(order) => setOrderData(order)}/>} />
                <Route path="/sucesso" element={
                    <Success orderData={orderData}/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
