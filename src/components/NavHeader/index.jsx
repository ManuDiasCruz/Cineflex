import styled from "styled-components"

export default function NavHeader(){
    return (
        <Header>
            <h1>CINEFLEX</h1>
            </Header>);}

            /*<ion-icon name="chevron-back"></ion-icon>
        </header>
    );
}*/

const Header = styled.header`
    position: fixed;
    width: 100%;
    height: 70px;
    top: 0px;
    left: 0px;
    right: 0px;
    background: #C3CFD9;
    display: flex;
    align-items: center;
    justify-content: center;

    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 40px;
        text-align: center;
        color: #E8833A;
    }

    ion-icon{
        width: 30px;
        height: 30px;
        background: url();
    }
    
    ion-icon:hover{
        cursor: pointer;
    }
`;