import { createGlobalStyle } from "styled-components";

/* width + padding - (100% + 30px) */
/* box-sizing: border-box: border-box (100%) */

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    button{
        cursor: pointer;
        border: none;
        background: transparent;
    }

    a{
        color: unset;
        text-decoration: none;
    }

    ul, ol, li{
        list-style: none;
    }

    h1, h2, h3, h4, h5, h6, p, a, span, li, button, input{
        font-family: 'Roboto', sans-serif;
    }
`;
