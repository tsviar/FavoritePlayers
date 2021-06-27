import React, {
  useState,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode } from "react";

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
    } from "./types";


// interface GlobalContextValue {
//   state:  (NameWortTable | NamesPreference | UserInfo | null) [],
//   dispatch: Dispatch<any>[]
// };

export type GlobalContextValue  = {
// state:    {
players_list: IPlayersList  ,
filtered_list: IPlayersList  ,
favorits_list: IFavoritsList  ,
loading_profiles: boolean,
favorits_counter: number,
error_message: string,

// },

// dispatch: {
set_players_list: Dispatch<any>,
set_filtered_list: Dispatch<any>,
set_favorits_list: Dispatch<any>,
set_loading_profiles: Dispatch<any>,
set_favorits_counter: Dispatch<any>,
set_error_message: Dispatch<any>,

// }
};


const StateDataManager = React.createContext<GlobalContextValue>({} as GlobalContextValue);
const { Provider } = StateDataManager;

const WrapperDataManager: FC = ({ children }: Props) => {
  console.log(`in WrapperDataManager`);

  const [players_list, set_players_list] =
                            useState<IPlayersList>([]);

  const [filtered_list, set_filtered_list] =
                            useState<IPlayersList>([]);

  const [favorits_list, set_favorits_list] =
                            useState<IPlayersList>([]);

  const [loading_profiles, set_loading_profiles] = useState(true);

  const [favorits_counter, set_favorits_counter] = useState<number>(0);


  const [error_message, set_error_message] = useState("");


  // interface IContextProps {
  //   state:  UserInfo | NamesPreference | NameWortTable [] ;
  //   dispatch:  Dispatch<SetStateAction<UserInfo>> | Dispatch<SetStateAction<NamesPreference>> |  Dispatch<SetStateAction<NameWortTable>> [];
  // }

  const states  = {
    players_list,
    filtered_list,
    favorits_list,
    loading_profiles,
    favorits_counter,
    error_message
  };

  const actions
  // : React.Dispatch<React.SetStateAction< NameWortTable | NamesPreference | UserInfo > >
  = {
    set_players_list,
    set_filtered_list,
    set_favorits_list,
    set_loading_profiles,
    set_favorits_counter,
    set_error_message,
  };


  const state = {...states};
  const dispatch = {...actions};
  const value: GlobalContextValue | null  =
  { ...state, ...dispatch };

  // WrapperDataManager adds a top Provider layer to ProfilesBrowser and all the tree ({children})
  // return <Provider value={{ ...states,  ...actions }}>{children}</Provider>;
   return <Provider value={value}>{children}</Provider>;
};

export { WrapperDataManager, StateDataManager };

