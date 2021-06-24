import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css?family=Expletus+Sans|Raleway|Griffy|Yanone+Kaffeesatz:400,700");

    @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

    @import url("https://fonts.googleapis.com/icon?family=Material+Icons");


    html,
    body {
      height: 100%;
    }
    html {
      /* font-size: 10px; */
      font-size: 12px;
    }
    body {
      /* display: flex;
      justify-content: center;
      align-items: center;
      */

      /* background: -moz-linear-gradient(
        top,
        #f5f5dc 0%,
        #d2b48c 100%
      );  */
      /* FF3.6-15 */
      /* background: -webkit-linear-gradient(
        top,
        #f5f5dc 0%,
        #d2b48c 100%
      );  */
      /* Chrome10-25,Safari5.1-6 */
      /* background: linear-gradient(
        to bottom,
        #f5f5dc 0%,
        #d2b48c 100%
      );  */
      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      /*border:aqua dashed 3px; */
      /*color:papayawhip*/
      outline:0;
      overflow: 'auto';
      font-family: 'Open Sans', sans-serif;
    }

    li {
      list-style-type: none;
    }

    #root{
        margin:0 auto;
    }

`;

export default GlobalStyles;