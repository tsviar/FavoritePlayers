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
import "../styles/ColorPaleteTheme.css"
// import GlobalStyles from "./styles/globalStyles";
// import { main_palete_theme } from "../styles/ColorPaleteTheme";


// import logo from './logo.svg';

import {
    IPlayerInfo,
    ITeam,

    IPlayersList,
    IPlayersList2,
    IPlayersList3,

    IFavoritsList,
    IFavoritsList2,
    IFavoritsList3,

    Props,
} from "../store/types";

  import {
    GlobalContextValue,
    StateDataManager
  } from "../store/DataManager";

import { FavButton1, FavButton2, FavButton3, IButtonProps} from "./FavButton";


// export interface IPlayerInfo {
//     id:            number;
//     first_name:    string;
//     last_name:     string;
//     position:      string;
//     height_feet:   number;
//     height_inches: number;
//     weight_pounds: number;
//     team:          ITeam;
//     favorite?:     boolean;
// }

export interface CardProps {
  playerInfo: IPlayerInfo;
  update_func_def: (  item: IPlayerInfo,
                      add_or_remove: boolean )
                      => void;
}


// const Card: FC<IPlayerInfo> = (props) => {
//   const [id, first_name, last_name, position, height_feet, height_inches,favorite] = {...props};
//   const full_name = {...props.team};
//   const team_full_name = full_name ;




const Card: FC <CardProps> = ( {playerInfo ,
//  update_func_def
 } ) => {
    // console.log('name:',name) {className, children}
    //	console.log('props:',props)


    const {
      filtered_list,
      set_filtered_list,
      favorits_list,
      set_favorits_list,
    } =  useContext<GlobalContextValue>(StateDataManager);



    const updateFavorite = (  add_or_remove: boolean
                            ) =>  {


        let list = favorits_list;

        console.log(add_or_remove, playerInfo, list);


        if(add_or_remove) {
          const new_list = list.filter( fav => fav.id !== playerInfo.id);

          console.log('Remove', add_or_remove, playerInfo, new_list);
          set_favorits_list(new_list) ;

        } else {
          list.push(playerInfo);
          console.log('add', add_or_remove, playerInfo, list);

          set_favorits_list(list) ;

        }

    };



    return (
      <Box>
        <TextsBox>
          <Title>{playerInfo.first_name} {playerInfo.last_name}</Title>
          <Title2> position: {playerInfo.position} </Title2>
           <MsgText><em>
              Team: </em> {playerInfo.team.full_name}
          </MsgText>
          {/* <MsgText>{address} </MsgText> */}
          <MsgText><em>
              Height (ft./ich.): </em> {playerInfo.height_feet} / {playerInfo.height_inches}
          </MsgText>

        </TextsBox>

        <FavBox>
           <FavButton3
             onClick={ updateFavorite }
             pressed={playerInfo.favorite}
           />
        </FavBox>
      </Box>
    );
  };


export default Card;


const Box = styled.div`
  padding: 1rem 0.8rem;
  cursor: pointer;

  &:hover: {
    background: var(--row-style);
  }

  &:active: {
    background: var(--row-style-selected);
    color: white;
  }

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

   width: 100%;

`;


const TextsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;
  /* padding-left: 2.8rem'; */

 width: 90%;

`;

const Title = styled.h1`
  font-family: Expletus Sans;
  textAlign: left;
  fontSize: 1.4rem;
`;

const Title2 = styled.h3`
  font-family: Expletus Sans;
  text-align: left;
  font-size: 1.1rem;
`;

const MsgText = styled.p`

  color: var(--info-vdark);

  font-size: calc(1.1rem + (2.0 - 1.1) * ((100vw - 300px) / (1600 - 300)));

  line-height: calc(1.2rem + (1.2 - 1.0) * ((100vw - 300px) / (1600 - 300)));

  text-align: left;
  font-family: Raleway;


  /* maxWidth: fit-content; */

`;


const FavBox = styled.div`
  display: flex;
  width: 10%;

  height: 100%;
`;