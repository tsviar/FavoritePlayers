import React, {
  FC,
  Dispatch,
  SetStateAction,
  ReactNode } from "react";

// A Nice solution:
// (Altough some people have stated problems with it)
export type JsonPrimitive = string | number | boolean | null ;
export interface JsonMap
                extends Record<string, JsonPrimitive | JsonArray | JsonMap> {};

export interface JsonArray extends Array<JsonPrimitive | JsonArray | JsonMap> {};
export type Json = JsonPrimitive | JsonMap | JsonArray;

// let a: Json = {};

//     a[1] = 5;
//     a["abc"] = "abc";
//     a = {
//       a: {
//         a: 2,
//       },
//       b: [1, 2, 3],
//       c: true,
//     };
//     a = [
//       {
//         "id": 1,
//         "title": "something",
//         "node": [
//           {
//             "id": 1,
//             "title": "something",
//             "node": [],
//           },
//         ],
//       },
//       {
//         "id": 2,
//         "title": "something",
//         "node": [
//           {
//             "id": 1,
//             "title": "something",
//             "node": [],
//           },
//         ],
//       },
//     ];

interface IDataNode {
    id: number;
    title: string;
    node: Array<IDataNode>;
}






// Response format:
// -----------------

//   "data":[
//     {
//       "id":237,
//       "first_name":"LeBron",
//       "last_name":"James",
//       "position":"F",
//       "height_feet": 6,
//       "height_inches": 8,
//       "weight_pounds": 250,
//       "team":{
//         "id":14,
//         "abbreviation":"LAL",
//         "city":"Los Angeles",
//         "conference":"West",
//         "division":"Pacific",
//         "full_name":"Los Angeles Lakers",
//         "name":"Lakers"
//       }
//     }
//     ...
//  ],
//  "meta": {
//     "total_pages": 50,
//     "current_page": 1,
//     "next_page": 2,
//     "per_page": 25,
//     "total_count": 9999
//   }
// }



// checking as favorite on a players card will add to list
// un-checking as favorite on a players card will remove from list



export interface IFavoritsList extends Array<IPlayerInfo> { }

export interface IFavoritsList2 {
    favorits: Array<IPlayerInfo>;
}

export interface IFavoritsList3 {
    [index: number]: IPlayerInfo;
}



// To parse this data:
//
//   import { Convert, toIRowJSON } from "./file";
//
//   const rawJson = Convert.toIRowJSON(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.


export interface IPlayerInfo {
    id:            number;
    first_name:    string;
    last_name:     string;
    position:      string;
    height_feet:   number;
    height_inches: number;
    weight_pounds: number;
    team:          ITeam;
    favorite?:     boolean;
}


// export type IPlayersList {
//     IPlayerInfo[];
// }

export enum TAction {
    Remove =0,
    Add = 1,
}


export interface IPlayersList4 {
    [index: number]: IPlayerInfo;
}

export interface IPlayersList extends Array<IPlayerInfo> { }
export interface IPlayersList2 {
    players: Array<IPlayerInfo>;
}

export interface IPlayersList3 {
    [index: number]: IPlayerInfo;
}


export interface ITeam {
    id:           number;
    abbreviation: string;
    city:         string;
    conference:   string;
    division:     string;
    full_name:    string;
    name:         string;
}

export interface IMeta {
    total_pages:  number;
    current_page: number;
    next_page:    number;
    per_page:     number;
    total_count:  number;
}


export type IRowJSON = {

   data: IPlayerInfo[],
   meta: IMeta
 }



export type Props = {
  // title: string;
  children?: React.ReactNode;
};

