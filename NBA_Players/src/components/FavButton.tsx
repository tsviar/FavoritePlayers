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
    } from "../store/types";

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
    props?: any;
    pressed?: boolean;
    onClick?: any;
}

export const FavButton2: React.FC<IButtonProps> = ({ onClick,  children, ...props }) => {

    const { pressed, ...rest } = props;

    return (
        <ButtonStyles {...rest} onClick={onClick}>
            {children}
            <i className="fa fa-heart" aria-hidden="true"></i>
        </ButtonStyles>
    );
};

//  pressed,

export const FavButton3: React.FC<IButtonProps> = ({  onClick,  children, ...props }) => {

   const { pressed, ...rest } = props;

   const clicked = (event: any) => {
            // event.target.style.color = "white";
           event.target.style.color = "red";
           onClick( false );
   }


    const themeFav = {
    fg: "red",
    };

    const themeUnFav = {
    fg: "white",
    };

    return (

            <ButtonStyles id="FAV-click-button" {...props} onClick={  clicked }>
                {children}

                <i className="fa fa-heart" aria-hidden="true"></i>

            </ButtonStyles>
    );
};


const ButtonStyles = styled.button`

    border: 1px solid black;
    height: 30%;
    width: 100%;
    margin: 4 0 0 0;
    /* width: 1rem; */
    border-radius: 50%;
    color: white;
     $ { ({props.pressed })  {
          color: red;
       }
    backgrounf-color: #050505;

`;


