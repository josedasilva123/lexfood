import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import Providers from "./providers/Providers";
import { GlobalStyle } from "./styles/global";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
   <React.StrictMode>
      <BrowserRouter>
         <GlobalStyle />
         <Providers>
            <App />
         </Providers>  
         
         <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />       
      </BrowserRouter>
   </React.StrictMode>
);
