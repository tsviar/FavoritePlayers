

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


//export async function fetchAllProfiles3() {
async function fetchDataFromServer(data_url: string) {
  const response = await fetch(data_url);
  if (!response.ok)
    throw new Error(`Api fetchDataFromServer failed: ${response.statusText}`);

  return await response.json();
}


  // const rawJson = await response.json();

  //  Convert.toIRowJSON( response.json() );

//===================================================================
//                   Response format:
//===================================================================


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

// {
//     "data":[
//         {
//             "id":14,
//             "first_name":"Ike",
//             "height_feet":null,
//             "height_inches":null,
//             "last_name":"Anigbogu",
//             "position":"C",
//             "team":{
//                 "id":12,
//                 "abbreviation":"IND",
//                 "city":"Indiana",
//                 "conference":"East",
//                 "division":"Central",
//                 "full_name":"Indiana Pacers",
//                 "name":"Pacers"
//             },
//             "weight_pounds":null
//             },
//             {
//                 "id":25,
//                 "first_name":"Ron",
//                 "height_feet":null,
//                 "height_inches":null,
//                 "last_name":"Baker",
//                 "position":"G",
//                 "team":{
//                     "id":20,
//                     "abbreviation":"NYK",
//                     "city":"New York",
//                     "conference":"East",
//                     "division":"Atlantic",
//                     "full_name":"New York Knicks",
//                     "name":"Knicks"
//                 },
//                 "weight_pounds":null
//             },
//     ],

//     "meta":{
//         "total_pages":139,
//         "current_page":1,
//         "next_page":2,
//         "per_page":25,
//         "total_count":3460
//     }
// }



//===================================================================
//                  Parse data handlers
//===================================================================

// To parse this data:
//
//   import { Convert, toIRowJSON } from "./[file name]";
//
//   const rawJson = Convert.toIRowJSON(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
//===================================================================


export class Convert {
    public static toIRowJSON(json: string): IRowJSON {
        return cast(JSON.parse(json), r("IRowJSON"));
    }

    public static IRowJSONToJson(value: IRowJSON): string {
        return JSON.stringify(uncast(value, r("IRowJSON")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "IRowJSON": o([
        { json: "data", js: "data", typ: a(r("IPlayerInfo")) },
        { json: "meta", js: "meta", typ: r("IMeta") },
    ], false),
    "IPlayerInfo": o([
        { json: "id", js: "id", typ: 0 },
        { json: "first_name", js: "first_name", typ: "" },
        { json: "last_name", js: "last_name", typ: "" },
        { json: "position", js: "position", typ: "" },
        { json: "height_feet", js: "height_feet", typ: 0 },
        { json: "height_inches", js: "height_inches", typ: 0 },
        { json: "weight_pounds", js: "weight_pounds", typ: 0 },
        { json: "team", js: "team", typ: r("ITeam") },
    ], false),
    "ITeam": o([
        { json: "id", js: "id", typ: 0 },
        { json: "abbreviation", js: "abbreviation", typ: "" },
        { json: "city", js: "city", typ: "" },
        { json: "conference", js: "conference", typ: "" },
        { json: "division", js: "division", typ: "" },
        { json: "full_name", js: "full_name", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], false),
    "IMeta": o([
        { json: "total_pages", js: "total_pages", typ: 0 },
        { json: "current_page", js: "current_page", typ: 0 },
        { json: "next_page", js: "next_page", typ: 0 },
        { json: "per_page", js: "per_page", typ: 0 },
        { json: "total_count", js: "total_count", typ: 0 },
    ], false),
};

export const englishNames = [
    'first',
    'second',
    'third',
];

//===================================================================
//                   Local Storage handlres
//===================================================================

//export async function fetchListLS(list_name) {
  const fetchListLS = async (list_name: string) => {
    let ls_list;

    try{
      const ls_list_Json = window.localStorage.getItem(list_name)!;
      ls_list = JSON.parse(ls_list_Json);

      const is_list_ok = (  typeof ls_list != "undefined"
                            && ls_list != null
                            && Array.isArray(ls_list)
                            && ls_list.length != null
                            && ls_list.length > 0 );
      if(!is_list_ok)
        throw new Error(`Api fetchListLS returned an empty list: ${ls_list_Json}`);
    } catch (err) {
      throw new Error(`Api fetchListLS: ${err}`);
    }

    return ls_list;
  }

//export async function storeListLS(list_name) {

 const storeListLS = async (list_name: string, list: any) => {

    console.log(`LOCAL STORAGE storeListLS GOT input list: `, list);

  try{
    const is_list_ok = ( typeof list != "undefined"
                        && list != null
                        // && Array.isArray(list)
                        // && list.length != null
                        // && list.length > 0
                        );

    const list_name_ok = ( typeof list_name != "undefined"
                          && list_name != null
                          && list_name.length != null
                          // && list_name.length > 0
                          );


    if(!is_list_ok && list_name_ok) {
          throw new Error(`Api LOCAL STORAGE  storeListLS received empty list or list_name: ${list_name}`);
    }

    const ls_list_json = JSON.stringify(list);
    console.log('JSON', ls_list_json);
    window.localStorage.setItem(list_name, ls_list_json);

  } catch (err) {
    throw new Error(`Api LOCAL STORAGE storeListLS: ${err}`);
  }

}

export {fetchDataFromServer, fetchListLS, storeListLS };
