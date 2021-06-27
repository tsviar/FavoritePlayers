// import * as React from "react";
import React, {
  useState,
  useEffect,
  useContext,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode
} from "react";


import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';

import '../../node_modules/font-awesome/css/font-awesome.min.css';


import {
    IPlayerInfo,
    ITeam,
    IMeta,
    IRowJSON,

    IPlayersList,
    IPlayersList2,
    IPlayersList3,

    IFavoritsList,
    IFavoritsList2,
    IFavoritsList3,

    Props,
    TAction,
 } from "../store/types";

import {
    GlobalContextValue,
    StateDataManager
} from "../store/DataManager";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}


/**
 * Button.
 *
 * @param {ButtonProps} props button's props
 * @returns {React.ReactElement<ButtonProps>} Button.
 */
export const FavButton1 = (props: ButtonProps): React.ReactElement<ButtonProps> => {

    const { children, ...rest } = props;


    return (
        <ButtonStyles
            {...rest}
        >
            {/* <FontAwesomeIcon icon={faHeart} /> */}
            <i className="fa fa-heart" aria-hidden="true"></i>

            {children}
        </ButtonStyles>
    );
}

export interface IButtonProps {
    children?: React.ReactNode;
    props?:    any;
    playerId?: number;
    pressed?:  boolean;
    opType?:    TAction;
    onClick?:  any;
}



export const FavButton2: React.FC<IButtonProps> = ({ onClick,  children, ...props }) => {

     let { playerId,  pressed, opType, ...rest } = props;

    return (
        <ButtonStyles {...rest} onClick={onClick}>
            {children}
            <i className="fa fa-heart" aria-hidden="true"></i>
        </ButtonStyles>
    );
};







export const FavButton3: React.FC<IButtonProps> = ({ onClick, children, ...props }) => {

    const {
      favorits_list,
      favorits_counter,
    } =  useContext<GlobalContextValue>(StateDataManager);


    let { playerId,  pressed, opType, ...rest } = props;

    if (undefined === pressed) pressed= false;




    const clicked = (event: any) => {
                // event.target.style.color = "white";
            event.target.style.color = "red";

            // onClick( false );
            onClick( opType );
    }


    useEffect(() => {

        console.log('useEffect start', favorits_list, favorits_list.length, playerId, pressed, );

        const found = favorits_list.find(item => item.id === playerId);

        // if(!found && !pressed ) {

           console.log('not found', found, pressed, favorits_list);
           const btn_id = document.getElementById('FAV-click-button') ;

           btn_id!.style.color = ( found || pressed ) ?'red' : 'black';

        // } else if (found || pressed) {
            console.log('found || pressed', found, pressed, favorits_list);
        // }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorits_counter] );




    return (

        <ButtonStyles id="FAV-click-button" {...props} onClick={  clicked }>
            {children}

            <i className="fa fa-heart" aria-hidden="true"></i>

        </ButtonStyles>
    );
};


const ButtonStyles = styled.button<IButtonProps>`

    border: 1px solid black;
    height: 30%;
    width: 100%;
    margin: 4 0 0 0;
    /* width: 1rem; */
    border-radius: 50%;
    color: black;
     /* color: white; */
     $ { ({props.pressed })  {
          color: red;
       }
    backgrounf-color: #050505;

`;


