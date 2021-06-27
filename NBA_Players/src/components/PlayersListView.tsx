import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode ,
  EffectCallback
} from "react";

//import robots_data from "../robots-data.json";

import styled from "styled-components";
import "../styles/ColorPaleteTheme.css"

import * as api from "../services/StorageService";

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

import { data_url } from "../store/data";
import Card , {CardProps} from "./Card";


// interface FunctionComponent<P = {}> {
//   (props: P & { children?: ReactNode },
//               context?: any): ReactElement | null;
//   propTypes?: WeakValidationMap<P>;
//   contextTypes?: ValidationMap<any>;
//   defaultProps?: Partial<P>;
//   displayName?: string;
// }

// interface IProps {
   // ... props interface
// }
// const MyNewComponent: React.FC<IProps> = (props) => {...};

// const Foo = observer((props) => {
// return (
//     <button onClick={props.store.actions.setName}>
//          {store.name}'s button
//     </button>
// )
// })

const PlayersListView: FC = () => {

    const {
      filtered_list,
      set_players_list,
      set_filtered_list,
      favorits_list,
      set_favorits_list,
      set_loading_profiles,
      set_error_message,
    } =  useContext<GlobalContextValue>(StateDataManager);


  // seEffect is used to fetch the data from the API
  // The promise resolving happens with async/await.


   const fetchData = async ( data_url: string ) => {

    console.log(`MANAGER fetchData`);
    set_loading_profiles(true);

    try {
      const web_list = await api.fetchDataFromServer(data_url);

      console.log(`MANAGER fetchData web_list:`);
      console.log('web_list', web_list);

      if (web_list) {
        console.log(`MANAGER fetchData weblist valid:`);
        console.log();

        // const list = api.Convert.toIRowJSON(web_list);

        const list: IPlayerInfo[] = web_list.data;
        list.forEach( item =>  item.favorite = false  );
        console.log('list', list);

        set_players_list(list);
        set_filtered_list(list);
        set_loading_profiles(false);
      } else {
        set_error_message(`MANAGER fetchData weblist NOT valid:`);

      }
    } catch (err) {
      set_error_message(err.message);
    }
  }

  // We only want to fetch data when the component mounts.
  // That’s why you can provide an empty array as second argument
  // to the effect hook
  // to avoid activating it on component updates
  // but only for the mounting of the component.

  useEffect(() => {
    console.log(`useEffect calling fetchDataFromLocalStorage`);

    fetchData(data_url);

    // add this line to disable warning:
    // React Hook useEffect has a missing dependency:fetchData...
    // (Do not enter a spzce row ...)
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );



    // Note:
    //create_list_ui now gets 2 inputs: list_data, update_selected_location

    // Note
    //in order to pass parameters to the onClick called function,
    // we need to define a new func
    // which will get the item that was selected
    //It has to be on the DOM element, the li

    const create_list_ui = (
                              items:  IPlayersList ,
                              // updateFavorite: (
                              //     item: IPlayerInfo,
                              //      add_or_remove: boolean )
                              //      => void
                            ) =>
      ( items as IPlayersList).map( (item: IPlayerInfo)  => {
        let cardProps = {
           playerInfo:  item,
          btnAction: TAction.Remove,
          //  update_func_def: updateFavorite,
        } as  CardProps;

       return (
        <CardItem key={item.id} >
          <Card { ...cardProps }/>
        </CardItem>
       );

      });


    return (
      <Container
      // container-fluid
        aria-label="Players Side"
        id="Players-Side-Box"
        role="list"
      >
          <CardListWrapper>
            <CardsList>
              {create_list_ui( filtered_list )}
            </CardsList>
          </CardListWrapper>
        </Container>

    );

};

export default PlayersListView;


 const Container = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;
    align-items: space-around;

    color:  var(--app-text-color);
    background-color: var(--app-bg-color);

    padding: 0 1.5rem;

    border-radius: 0.8rem;

    height: 95%;
    min-height: inherit;
    /* height: 75vh; */

    width: 100%;
    min-width: 100%;

    border-radius: 0.4rem;
    box-shadow: 0 0.2rem 0.8rem var(--list-box-shadow);

    overflow-x: hidden;
    overflow-y: auto;

`;

const CardListWrapper = styled.div`
   display: flex;
    /* margin: 10  0; */
    /* padding: 1 0 10 0; */
    height: 95%;
    min-height: 90%;
    width:90%; *

    border-radius: 0.4rem;

    overflow-x: hidden;
    overflow-y: scroll;

`;

const CardsList = styled.ul`

    /* margin: 1px; */
    padding: 0 0 1.1rem 1rem;
    height: auto%;
    min-height: 90%;
    width: 905;

`;

const CardItem = styled.li`
    display: flex;

    &:nth-child(even) {
      background: var(--row-style);
    }
    &:nth-child(odd) {
      background: var(--row-style-selected);
    }

    /* &:nth-child() {
      padding-bottom: 5.5rem;
    } */


    @media all and (min-width: 700px): {
      margin: auto;
      padding: 0.1rem 0 0.1rem 0.1rem;
    }
`;