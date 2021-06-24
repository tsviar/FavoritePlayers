import React from 'react';

import styled from "styled-components";
import GlobalStyles from "./styles/globalStyles";

import "./styles/ColorPaleteTheme.css"
// import './App.css';

// import logo from './logo.svg';

import { WrapperDataManager } from "./store/DataManager";

// import HomePage from "./components/HomePage";
import PlayersListView from "./components/PlayersListView";


const App = () => {


  return (
    <Box
      aria-label="App main Box"
      id="App-Main-Box"
      //role="article"
      role="navigation"
    >
      <Header
        aria-label="App Header"
        id="App-Header"
        role="Header"
      >
        <H1Header> My Favorite NBA Players </H1Header>
      </Header>

      <Container
      // className="App"
        aria-label="App Container"
        id="App-Container"
        role="article"
        // role="navigation"
      >



        <WrapperDataManager>

          <LeftContainer>
          </LeftContainer>

          <RightContainer>
            <PlayersListView/>
          </RightContainer>

        </WrapperDataManager>

        <GlobalStyles />

      </Container>
    </Box>
  );
}

export default App;

const Box = styled.div`
  /* background: lightskyblue; */
    height: 100vh;
    width: 60vw;
    position: absolute;
    top: 0rem;
    right: 0.5rem;
    /* padding-top: 3rem; */

    display: flex;
    flex-direction: column;
    align-content: space-around;
    align-items: center;
    justify-content: center;

        /* padding: 3rem 7.5rem; */
    border-radius: 0.8rem;

    padding: 1em;
    /* padding: .3em; */
    /* color: white; */
    color:  var(--app-text-color);
    /* background-color: #232f3e; */
    background-color: var(--app-bg-color);
    /* background-color: #232f3e; */

`;


const Header = styled.div`
    height:10;
    width: 100%;

    display: flex;
    flex-basis: 0 0 100%;
    display: flex;
    align-content: center;
    text-align: center;

    margin-right: 1.5em;
    margin-left: 1.5em;

    padding: 0.3rem 0;

    color:  var(--header-main);
    /* color:  var(--app-NBA-blue-rgb); */
    /* background-color: #232f3e; */
    background-color: var(--app-bg-color);
`;

const H1Header = styled.h1`
    text-align: center;
    padding: 0.3rem 0;
`;

const Container = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;

    height: 90%;
    width: 100%;
    flex-basis: 0 0 100%;

`;


const RightContainer = styled.section`
    /* height: 80vh; */
    height: 100%;
    width: 45vw;

    /* border-right: 2px solid #ddd; */

    margin-right: 1.5em;
    margin-left: 1.5em;

    @media(max-width:650px){

    }
`;

const LeftContainer = styled.aside`
    /* height:80vh; */
    height: 95%;
    width: 45vw;
    display: flex;
    flex-direction: column;

    margin-right: 1.5em;
    margin-left: 1.5em;
`;




        /* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */