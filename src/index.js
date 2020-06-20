import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
//import Counters from "./components/counters"
//import Movies from "./movies";
import {BrowserRouter} from "react-router-dom";

console.log("SUPER MAN", process.env.REACT_APP_NAME);

ReactDOM.render( 
    <BrowserRouter>
        <App />
    </BrowserRouter> ,
        document.getElementById("root")
);