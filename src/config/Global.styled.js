import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle` 
  *,
  *::before,
  *::after { 
    margin:0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  } 

  @font-face { 
    font-family: "Helvetica-Regular"; 
    src: url("assets/fonts/Helvetica.ttf");
    font-display: swap;
  };
  @font-face {
    font-family: 'FiraGO-Regular';
    src: url('assets/fonts/FiraGO-Regular.woff2');
    font-display: swap;
 }

  ul, ol{
    list-style-type: none;
  }

  body {
    font-family: "FiraGO-Regular";  
  } 
`;