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
    opType?:   TAction;
    color?:    string;
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
      players_list,
      favorits_list,
      favorits_counter,
    } =  useContext<GlobalContextValue>(StateDataManager);


    let { playerId,  pressed, opType, ...rest } = props;

    const [btn_color, set_btn_color] = useState('black');
    const [btn_id, set_btn_id] = useState(`FAVbtn-${playerId}-${opType}`);

    if (undefined === pressed) pressed= false;




    const clicked = (event: any) => {

       onClick( opType );

        const found = favorits_list.find(item => item.id === playerId);

        if(found !== undefined) {
            event.target.style.color = "red";
            set_btn_color('red');
        } else {

            event.target.style.color = 'black';
            set_btn_color('black');
        }

    }


    useEffect(() => {

        const found = favorits_list.find(item => item.id === playerId);
        // const btn_id2 = document.getElementById(btn_id!) ;


        if(found !== undefined) {
            // btn_id2!.style.color = "red";
            set_btn_color('red');
        } else {
            // btn_id2!.style.color = 'black';
            set_btn_color('black');
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorits_counter, favorits_list, favorits_list.length] );




   useEffect(() => {

        const btn_id2 = document.getElementById(btn_id!) ;

        btn_id2!.style.color = btn_color;

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [btn_color] );





    return (


        <ButtonStyles id={btn_id} {...props} color={btn_color} onClick={  clicked } >
            {children}

            <i className="fa fa-heart" aria-hidden="true" style={{color: btn_color}}></i>

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

    color: ${  props => {
        /* console.log('props color', props.color); */
        return props.color;
        }};
    backgrounf-color: #050505;

`;


